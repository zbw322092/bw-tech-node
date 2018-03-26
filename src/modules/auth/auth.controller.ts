import { Controller, Post, Body, Get } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { SignupDto } from "./dto/auth.signup.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): any {
    console.log(`Param: ${JSON.stringify(signupDto)}`);
    // return this.authService.signup(signupDto);
    return 'hi there, functionCode';
  }

  @Post('/email_avaliable')
  isEmailAvaliable(@Body('email') email: string) {
    return this.authService.checkEmailAvaliable(email).then((count: number) => {
      return { avaliable: count ? false : true };
    });
  }
}