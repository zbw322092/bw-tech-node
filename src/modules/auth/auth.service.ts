import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/auth.signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { Repository } from "typeorm";
import { CommonResponse } from "../common/Interfaces/response";
import { ServerResponse } from "../common/ServerResponse";
import { isValidEmail, passwordValidator } from "./utils/validator";
import { errorDataValidation } from "../common/Const.Error";

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
  ) {}

  public async signup(signupDto: SignupDto): Promise<CommonResponse> {
    const { email, name, password } = signupDto;
    // check email validation
    if (!isValidEmail(email)) {
      return ServerResponse.createByErrorCodeMsgData(errorDataValidation(AuthResCode.invalidEmail), AuthResMsg.invalidEmail, {});
    }

    // check password validation
    const pwdValidation = passwordValidator(password, email);
    if (!pwdValidation.isValid) {
      if (pwdValidation.error === 0) {
        return ServerResponse.createByErrorCodeMsgData(errorDataValidation(AuthResCode.weakPwd), AuthResMsg.weakPwd, {});
      } else if (pwdValidation.error === 1) {
        return ServerResponse.createByErrorCodeMsgData(errorDataValidation(AuthResCode.commonPwd), AuthResMsg.commonPwd, {});
      } else if (pwdValidation.error === 2) {
        return ServerResponse.createByErrorCodeMsgData(errorDataValidation(AuthResCode.pwdSameAsEmail), AuthResMsg.pwdSameAsEmail, {});
      }
    }

    // check email avaliable
    const emailAvaliable = await this.checkEmailAvaliable(email);
    if (emailAvaliable) {
      return ServerResponse.createByErrorCodeMsgData(errorDataValidation(AuthResCode.unavaliableEmaill), AuthResMsg.unavaliableEmaill, {});
    }

    return ServerResponse.createBySuccessMsgData('Register Success', {});
  }

  public async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ email: email });
    return userCount;
  }
}