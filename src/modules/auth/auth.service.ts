import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/auth.signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { Repository } from "typeorm";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createBySuccess, createByFail } from "../common/serverResponse/ServerResponse";
import { isValidEmail, passwordValidator } from "../../utils/validator";
import { errorValidation } from "../common/serverResponse/Const.Error";

enum AuthResCode {
  'invalidEmail' = '1001',
  'unavaliableEmaill' = '1002',
  'weakPwd' = '1003',
  'commonPwd' = '1004',
  'pwdSameAsEmail' = '1005'
}

enum AuthResMsg {
  'invalidEmail' = 'email is not valid',
  'unavaliableEmaill' = 'email alreay registered',
  'weakPwd' = 'password must contains lowercase, uppercase, numeric, special character and at least 8 digital long.',
  'commonPwd' = 'password is easy to guess',
  'pwdSameAsEmail' = 'password must not the same as email'
}

@Component()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) { }

  public async signup(signupDto: SignupDto): Promise<ICommonResponse<any>> {
    const { email, name, password } = signupDto;
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
      return createByFail({ code: errorValidation(AuthResCode.unavaliableEmaill), message: AuthResMsg.unavaliableEmaill });
    }

    return createBySuccess({ message: 'Register Success', data: {} });
  }

  public async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ email: email });
    return userCount;
  }
}