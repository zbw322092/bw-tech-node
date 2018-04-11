import { Controller, Post, Body, Get, Session } from "@nestjs/common";
import { SignupDto, EmailAvaliableDto, NameAvaliableDto, ActiveAccountDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('/sign_up')
  public signup(@Session() session, @Body('param') signupDto: SignupDto): Promise<ICommonResponse<any>> {
    return this.usersService.signup(session, signupDto);
  }

  @Post('/email_avaliable')
  public isEmailAvaliable(@Body('param') emailAvaliableDto: EmailAvaliableDto) {
    return this.usersService.emailAvaliable(emailAvaliableDto.email);
  }

  @Post('/name_avaliable')
  public isNameAvaliable(@Body('param') nameAvaliableDto: NameAvaliableDto) {
    return this.usersService.nameAvaliable(nameAvaliableDto.name);
  }

  @Post('/active_account')
  public activeAccount(@Session() session, @Body('param') activeAccountDto: ActiveAccountDto) {
    return this.usersService.activeAccount(session, activeAccountDto.token);
  }

  @Post('/sign_in')
  public signIn(): Promise<ICommonResponse<any>> {
    // todo
    return null;
  }
}