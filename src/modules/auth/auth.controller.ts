import { Controller, Post, Body, Get } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { SignupDto } from "./dto/auth.signup.dto";
import { AuthService } from "./auth.service";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body('param') signupDto: SignupDto): Promise<ICommonResponse<any>> {
    return this.authService.signup(signupDto);
  }

  @Post('/email_avaliable')
  isEmailAvaliable(@Body('email') email: string) {
    return this.authService.checkEmailAvaliable(email).then((count: number) => {
      return { avaliable: count ? false : true };
    });
  }
}