import { Controller, Post, Body, Get, Session } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { SignupDto, EmailAvaliableDto, NameAvaliableDto, ActiveAccountDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/sign_up')
  public signup(@Session() session, @Body('param') signupDto: SignupDto): Promise<ICommonResponse<any>> {
    return this.authService.signup(session, signupDto);
  }

  @Post('/email_avaliable')
  public isEmailAvaliable(@Body('param') emailAvaliableDto: EmailAvaliableDto) {
    return this.authService.emailAvaliable(emailAvaliableDto.email);
  }

  @Post('/name_avaliable')
  public isNameAvaliable(@Body('param') nameAvaliableDto: NameAvaliableDto) {
    return this.authService.nameAvaliable(nameAvaliableDto.name);
  }

  @Post('/active_account')
  public activeAccount(@Session() session, @Body('param') activeAccountDto: ActiveAccountDto) {
    return this.authService.activeAccount(session, activeAccountDto.token);
  }

  @Post('/sign_in')
  public signIn(): Promise<ICommonResponse<any>> {
    // todo
    return null;
  }
}