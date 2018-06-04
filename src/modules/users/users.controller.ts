import { Controller, Post, Body, Get, Session } from '@nestjs/common';
import { SignupDto, EmailAvaliableDto, NameAvaliableDto, ActiveAccountDto, SigninDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ICommonResponse } from '../common/interfaces/ICommonResponse';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('/sign_up')
  public signup(@Session() session, @Body('param') signupDto: SignupDto): Promise<ICommonResponse<any>> {
    return this.usersService.signup(session, signupDto);
  }

  @Post('/email_avaliable')
  public isEmailAvaliable(@Body('param') emailAvaliableDto: EmailAvaliableDto): Promise<ICommonResponse<any>> {
    return this.usersService.emailAvaliable(emailAvaliableDto.email);
  }

  @Post('/name_avaliable')
  public isNameAvaliable(@Body('param') nameAvaliableDto: NameAvaliableDto): Promise<ICommonResponse<any>> {
    return this.usersService.nameAvaliable(nameAvaliableDto.name);
  }

  @Post('/active_account')
  public activeAccount(@Session() session, @Body('param') activeAccountDto: ActiveAccountDto): Promise<ICommonResponse<any>> {
    return this.usersService.activeAccount(session, activeAccountDto.token);
  }

  @Post('/sign_in')
  public signIn(@Session() session, @Body('param') signinDto: SigninDto): Promise<ICommonResponse<any>> {
    return this.usersService.signIn(session, signinDto);
  }

  @Post('/sign_out')
  public signOut(@Session() session): Promise<ICommonResponse<any>> {
    return this.usersService.signOut(session);
  }
}