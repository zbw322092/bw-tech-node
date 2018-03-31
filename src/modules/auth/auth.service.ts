import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { Repository, getRepository, getManager } from "typeorm";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createBySuccess, createByFail } from "../common/serverResponse/ServerResponse";
import { isValidEmail, passwordValidator } from "../../utils/validator";
import { errorValidation } from "../common/serverResponse/Const.Error";
import { InvitesService } from "../invites/invites.service";
import { Roles } from "../roles/roles.entity";
import { uniqid } from "../../utils/uniqid";
import { RolesUsers } from "../rolesusers/rolesusers.entity";
import { IdPrefix } from "../common/const/IdPrefix";
const bcrypt = require('bcrypt');

enum AuthResCode {
  'invalidEmail' = '1001',
  'unavaliableEmail' = '1002',
  'weakPwd' = '1003',
  'commonPwd' = '1004',
  'pwdSameAsEmail' = '1005',
  'unavaliableName' = '1006',
  'incorrectCaptcha'= '1007'
}

enum AuthResMsg {
  'invalidEmail' = 'email is not valid',
  'unavaliableEmail' = 'email alreay registered',
  'weakPwd' = 'password must contains lowercase, uppercase, numeric, special character and at least 8 digital long.',
  'commonPwd' = 'password is easy to guess',
  'pwdSameAsEmail' = 'password must not the same as email',
  'unavaliableName' = 'name has been taken',
  'incorrectCaptcha'= 'incorrect captcha'
}

@Component()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
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
      return createByFail({code: AuthResCode.incorrectCaptcha, message: AuthResMsg.incorrectCaptcha });
    }

    // check email validation
    if (!isValidEmail(email)) {
      return createByFail({ code: errorValidation(AuthResCode.invalidEmail), message: AuthResMsg.invalidEmail });
    }

    // check password validation
    const pwdValidation = passwordValidator(password, email);
    if (!pwdValidation.isValid) {
      if (pwdValidation.error === 0) {
        return createByFail({ code: errorValidation(AuthResCode.weakPwd), message: AuthResMsg.weakPwd });
      } else if (pwdValidation.error === 1) {
        return createByFail({ code: errorValidation(AuthResCode.commonPwd), message: AuthResMsg.commonPwd });
      } else if (pwdValidation.error === 2) {
        return createByFail({ code: errorValidation(AuthResCode.pwdSameAsEmail), message: AuthResMsg.pwdSameAsEmail });
      }
    }

    // check email avaliable
    const emailAvaliable = await this.checkEmailAvaliable(email);
    if (emailAvaliable) {
      return createByFail({ code: errorValidation(AuthResCode.unavaliableEmail), message: AuthResMsg.unavaliableEmail });
    }
    // check name avaliable
    const nameAvaliable = await this.checkNameAvaliable(name);
    if (nameAvaliable) {
      return createByFail({ code: errorValidation(AuthResCode.unavaliableName), message: AuthResMsg.unavaliableName });
    }

    // check if this user has been invited, if invited, register this user using invited role, 
    // otherwise, register this user as visitor role as default.
    const { invitedUsers, invitedUsersCount } = await this.invitesService.findInvitedUser(email);
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

    const newUser = this.userRepository.create({
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

    return createBySuccess({ message: 'Register Success', data: {} });
  }

  private async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ email });
    return userCount;
  }

  private async checkNameAvaliable(name: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ name });
    return userCount;
  }

  public async emailAvaliable(email: string): Promise<ICommonResponse<any>> {
    const count = await this.checkEmailAvaliable(email);
    return count ? createByFail({ code: AuthResCode.unavaliableEmail, message: AuthResMsg.unavaliableEmail }) :
    createBySuccess({ message: 'email avaliable', data: {} });
  }

  public async nameAvaliable(name: string): Promise<ICommonResponse<any>> {
    const count = await this.checkNameAvaliable(name);
    return count ? createByFail({ code: AuthResCode.unavaliableName, message: AuthResMsg.unavaliableName }) :
    createBySuccess({ message: 'name avaliable', data: {} });
  }
}