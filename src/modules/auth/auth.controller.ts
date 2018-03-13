import { Controller, Post, Body } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { SignupDto } from "./dto/auth.signup.dto";

@Controller('auth') 
export class AuthController {
  @Post('/signup')
  signUp(@Body() signupDto: SignupDto): any {
    console.log(`Param: ${JSON.stringify(signupDto)}`);
    return signupDto;
  }
}