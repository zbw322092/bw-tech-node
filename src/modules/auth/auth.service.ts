import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/auth.signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { Repository } from "typeorm";
import { CommonResponse } from "../common/Interfaces/response";
import { ServerResponse } from "../common/ServerResponse";

@Component()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  public async signup(signupDto: SignupDto): Promise<CommonResponse> {
    const { email, name, password } = signupDto;
    const emailAvaliable = await this.checkEmailAvaliable(email);
    if (emailAvaliable) return ServerResponse.createBySuccessMsgData('email alreay registered', {});
    return ServerResponse.createBySuccessMsgData('Register Success', {});
  }

  public async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ email: email });
    return userCount;
  }
}