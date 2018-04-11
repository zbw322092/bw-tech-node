import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository, getRepository, getManager } from "typeorm";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createBySuccess, createByFail } from "../common/serverResponse/ServerResponse";
import { isValidEmail, passwordValidator } from "../../utils/validator";
import { errorAuth } from "../common/serverResponse/Const.Error";
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

enum AuthResCode {
  'invalidEmail' = '1001',
  'unavaliableEmail' = '1002',
  'weakPwd' = '1003',
  'commonPwd' = '1004',
  'pwdSameAsEmail' = '1005',
  'unavaliableName' = '1006',
  'incorrectCaptcha'= '1007',
  'incorrectActiveToken' = '1008',
  'activeTokenExpired' = '1009'
}

enum AuthResMsg {
  'invalidEmail' = 'email is not valid',
  'unavaliableEmail' = 'email alreay registered',
  'weakPwd' = 'password must contains lowercase, uppercase, numeric, special character and at least 8 digital long.',
  'commonPwd' = 'password is easy to guess',
  'pwdSameAsEmail' = 'password must not the same as email',
  'unavaliableName' = 'name has been taken',
  'incorrectCaptcha'= 'incorrect captcha',
  'incorrectActiveToken' = 'incorrect activation token',
  'activeTokenExpired' = 'active token expired, please resend activtaion email'
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

  public async signup(session, signupDto: SignupDto): Promise<ICommonResponse<any>> {
    const { email, name, password, captcha } = signupDto;
    // check captcha
    if (session.captcha !== captcha) {
      return createByFail({code: errorAuth(AuthResCode.incorrectCaptcha), message: AuthResMsg.incorrectCaptcha });
    }
    delete session.captcha;

    // check email validation
    if (!isValidEmail(email)) {
      return createByFail({ code: errorAuth(AuthResCode.invalidEmail), message: AuthResMsg.invalidEmail });
    }

    // check password validation
    const pwdValidation = passwordValidator(password, email);
    if (!pwdValidation.isValid) {
      if (pwdValidation.error === 0) {
        return createByFail({ code: errorAuth(AuthResCode.weakPwd), message: AuthResMsg.weakPwd });
      } else if (pwdValidation.error === 1) {
        return createByFail({ code: errorAuth(AuthResCode.commonPwd), message: AuthResMsg.commonPwd });
      } else if (pwdValidation.error === 2) {
        return createByFail({ code: errorAuth(AuthResCode.pwdSameAsEmail), message: AuthResMsg.pwdSameAsEmail });
      }
    }

    // check email avaliable
    const emailAvaliable = await this.checkEmailAvaliable(email);
    if (emailAvaliable) {
      return createByFail({ code: errorAuth(AuthResCode.unavaliableEmail), message: AuthResMsg.unavaliableEmail });
    }
    // check name avaliable
    const nameAvaliable = await this.checkNameAvaliable(name);
    if (nameAvaliable) {
      return createByFail({ code: errorAuth(AuthResCode.unavaliableName), message: AuthResMsg.unavaliableName });
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
    return count ? createByFail({ code: errorAuth(AuthResCode.unavaliableEmail), message: AuthResMsg.unavaliableEmail }) :
    createBySuccess({ message: 'email avaliable', data: {} });
  }

  public async nameAvaliable(name: string): Promise<ICommonResponse<any>> {
    const count = await this.checkNameAvaliable(name);
    return count ? createByFail({ code: errorAuth(AuthResCode.unavaliableName), message: AuthResMsg.unavaliableName }) :
    createBySuccess({ message: 'name avaliable', data: {} });
  }

  public async activeAccount(session, token: string) {
    const inviteToken = decodeBase64(token);
    const invitation = await this.invitesService.findInvitationByToken(inviteToken);
    if (!invitation.length) {
      // no such account activation invitaion
      return createByFail({ code: errorAuth(AuthResCode.incorrectActiveToken), message: AuthResMsg.incorrectActiveToken });
    }
    if (invitation[0].expires < Date.now()) {
      return createByFail({ code: errorAuth(AuthResCode.activeTokenExpired), message: AuthResMsg.activeTokenExpired });
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
}