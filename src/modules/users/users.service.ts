import { Component } from "@nestjs/common";
import { SignupDto, SigninDto } from "./dto/users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository, getRepository, getManager } from "typeorm";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createBySuccess, createByFail } from "../common/serverResponse/ServerResponse";
import { isValidEmail, passwordValidator } from "../../utils/validator";
import { errorUser } from "../common/serverResponse/Const.Error";
import { InvitesService } from "../invites/invites.service";
import { Roles } from "../roles/roles.entity";
import { uniqid } from "../../utils/uniqid";
import { RolesUsers } from "../rolesusers/rolesusers.entity";
import { IdPrefix } from "../common/const/IdPrefix";
import { mailContentGenerator } from "../common/services/mail-sender/mailContentGenerator";
import * as path from 'path';
import nconf from "../../config/config";
import { encodeBase64, decodeBase64 } from "../../utils/url";
import { MailSender } from "../common/services/mail-sender";
import { MailSubject } from "../common/const/MailConst";
import { Invites } from "../invites/invites.entity";
import { getCurrentDatetime } from "../../utils/timeHandler";
const bcrypt = require('bcrypt');

enum UserResCode {
  'invalidEmail' = 'USER.1001',
  'unavaliableEmail' = 'USER.1002',
  'weakPwd' = 'USER.1003',
  'commonPwd' = 'USER.1004',
  'pwdSameAsEmail' = 'USER.1005',
  'unavaliableName' = 'USER.1006',
  'incorrectCaptcha'= 'USER.1007',
  'incorrectActiveToken' = 'USER.1008',
  'activeTokenExpired' = 'USER.1009',
  'emailPwdNotMatch' = 'USER.1010'
}

enum UserResMsg {
  'invalidEmail' = 'email is not valid',
  'unavaliableEmail' = 'email alreay registered',
  'weakPwd' = 'password must contains lowercase, uppercase, numeric, special character and at least 8 digital long.',
  'commonPwd' = 'password is easy to guess',
  'pwdSameAsEmail' = 'password must not the same as email',
  'unavaliableName' = 'name has been taken',
  'incorrectCaptcha'= 'incorrect captcha',
  'incorrectActiveToken' = 'incorrect activation token',
  'activeTokenExpired' = 'active token expired, please resend activtaion email',
  'emailPwdNotMatch' = 'email and password are not match'
}

@Component()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private roleRespository: Repository<Roles>,
    @InjectRepository(RolesUsers)
    private rolesUsersRespository: Repository<RolesUsers>,
    private readonly invitesService: InvitesService
  ) { }

  public async signup(session: any, signupDto: SignupDto): Promise<ICommonResponse<any>> {
    const { email, name, password, captcha } = signupDto;
    // check captcha
    if (session.captcha !== captcha) {
      return createByFail({code: errorUser(UserResCode.incorrectCaptcha), message: UserResMsg.incorrectCaptcha });
    }
    delete session.captcha;

    // check email validation
    if (!isValidEmail(email)) {
      return createByFail({ code: errorUser(UserResCode.invalidEmail), message: UserResMsg.invalidEmail });
    }

    // check password validation
    const pwdValidation = passwordValidator(password, email);
    if (!pwdValidation.isValid) {
      if (pwdValidation.error === 0) {
        return createByFail({ code: errorUser(UserResCode.weakPwd), message: UserResMsg.weakPwd });
      } else if (pwdValidation.error === 1) {
        return createByFail({ code: errorUser(UserResCode.commonPwd), message: UserResMsg.commonPwd });
      } else if (pwdValidation.error === 2) {
        return createByFail({ code: errorUser(UserResCode.pwdSameAsEmail), message: UserResMsg.pwdSameAsEmail });
      }
    }

    // check email avaliable
    const emailAvaliable = await this.checkEmailAvaliable(email);
    if (emailAvaliable) {
      return createByFail({ code: errorUser(UserResCode.unavaliableEmail), message: UserResMsg.unavaliableEmail });
    }
    // check name avaliable
    const nameAvaliable = await this.checkNameAvaliable(name);
    if (nameAvaliable) {
      return createByFail({ code: errorUser(UserResCode.unavaliableName), message: UserResMsg.unavaliableName });
    }

    // check if this user has been invited, if invited, register this user using invited role, 
    // otherwise, register this user as visitor role as default.
    const { invitedUsers, invitedUsersCount } = await this.invitesService.findInvitationByEmail(email);
    let roleId: string, createdBy: string;
    if (invitedUsersCount) {
      roleId = invitedUsers[invitedUsersCount - 1].role_id;
      createdBy = invitedUsers[invitedUsersCount - 1].created_by;
    } else {
      const roleIdArr = await this.roleRespository.query(`SELECT id from roles WHERE name = 'visitor'`);
      roleId = roleIdArr[0].id;
    }
    
    const userId: string = uniqid('user-');

    const saltRounds = 10;
    const encryptedPwd = await bcrypt.hash(password, saltRounds);

    const newUser = this.usersRepository.create({
      id: userId,
      name,
      email,
      password: encryptedPwd,
      status: 'inactive',
      created_by: createdBy || userId
    });

    const newRolesUsers = this.rolesUsersRespository.create({
      id: uniqid(IdPrefix.RolesUsers),
      role_id: roleId,
      user_id: userId
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(newUser);
      await transactionalEntityManager.save(newRolesUsers);
    });

    // add invitation
    const invitation = await this.invitesService.addInvitation({roleId, email, createdBy: userId});

    const server = nconf.get('server');
    const url = `${server.protocol}://${server.host}`;
    const activeLink = path.join(url, 'active-account', encodeBase64(invitation.token), '/');
    const mailContent = mailContentGenerator('active-account', { username: name, activeLink });
    const mailSender = new MailSender(email, MailSubject.ActiveAccount, mailContent.text, mailContent.html);
    await mailSender.sendMail();

    // update invitation status to 'sent'
    await this.invitesService.updateInvitationStatus({ token: invitation.token, status: 'sent', updatedBy: userId });

    // add userId to session
    session.userId = userId;

    return createBySuccess({ message: 'Register Success', data: {} });
  }

  private async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.usersRepository.findAndCount({ email });
    return userCount;
  }

  private async checkNameAvaliable(name: string): Promise<number> {
    const [userRecords, userCount] = await this.usersRepository.findAndCount({ name });
    return userCount;
  }

  public async emailAvaliable(email: string): Promise<ICommonResponse<any>> {
    const count = await this.checkEmailAvaliable(email);
    return count ? createByFail({ code: errorUser(UserResCode.unavaliableEmail), message: UserResMsg.unavaliableEmail }) :
    createBySuccess({ message: 'email avaliable', data: {} });
  }

  public async nameAvaliable(name: string): Promise<ICommonResponse<any>> {
    const count = await this.checkNameAvaliable(name);
    return count ? createByFail({ code: errorUser(UserResCode.unavaliableName), message: UserResMsg.unavaliableName }) :
    createBySuccess({ message: 'name avaliable', data: {} });
  }

  public async activeAccount(session: any, token: string) {
    const inviteToken = decodeBase64(token);
    const invitation = await this.invitesService.findInvitationByToken(inviteToken);
    if (!invitation.length) {
      // no such account activation invitaion
      return createByFail({ code: errorUser(UserResCode.incorrectActiveToken), message: UserResMsg.incorrectActiveToken });
    }
    if (invitation[0].expires < Date.now()) {
      return createByFail({ code: errorUser(UserResCode.activeTokenExpired), message: UserResMsg.activeTokenExpired });
    }
    const email = invitation[0].email;
    let userId = session.userId;
    if (!userId) {
      const user = await this.usersRepository.findOne({ email });
      userId = user.id;
      session.userId = userId;
    }

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(Invites, { token: inviteToken }, { status: 'accepted', updated_at: getCurrentDatetime(), updated_by: userId });
      await transactionalEntityManager.update(Users, { email }, { status: 'active', updated_at: getCurrentDatetime(), updated_by: userId });
    });

    return createBySuccess({ message: 'account actived successfully', data: {} });
  }

  public async signIn(session: any, siginDto: SigninDto): Promise<ICommonResponse<any>> {
    const { email, password } = siginDto;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      return createByFail({ code: errorUser(UserResCode.emailPwdNotMatch), message: UserResMsg.emailPwdNotMatch });
    }
    const pwdValidation = await bcrypt.compare(password, user.password);
    if (!pwdValidation) {
      return createByFail({ code: errorUser(UserResCode.emailPwdNotMatch), message: UserResMsg.emailPwdNotMatch });
    }
    session.logined = true;
    session.userId = user.id;
    return createBySuccess({ message: 'sign in successfully', data: {} });
  }

  public async signOut(session: any): Promise<ICommonResponse<any>> {
    delete session.logined;
    delete session.userId;
    return createBySuccess({ message: 'sign out successfully', data: {} });
  }
}