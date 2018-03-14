import { Component } from "@nestjs/common";
import { SignupDto } from "./dto/auth.signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { Repository } from "typeorm";

@Component()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  public signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

  }

  public async checkEmailAvaliable(email: string): Promise<number> {
    const [userRecords, userCount] = await this.userRepository.findAndCount({ email: email });
    return userCount;
  }
}