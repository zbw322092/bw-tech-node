import { Length, IsEmail } from "class-validator";

export class SignupDto {
  @Length(5, 191)
  @IsEmail()
  readonly email: string = '';
  
  @Length(1, 191)
  readonly name: string = '';

  @Length(6, 60)
  readonly password: string = '';

  @Length(4, 4)
  readonly captcha: string = '';
}

export class EmailAvaliableDto {
  @Length(5, 191)
  @IsEmail()
  readonly email: string = '';
}

export class NameAvaliableDto {
  @Length(1, 191)
  readonly name: string = '';
}

export class ActiveAccountDto {
  @Length(1, 300)
  readonly token: string = '';
}

export class SigninDto {
  @Length(5, 191)
  @IsEmail()
  readonly email: string = '';

  @Length(6, 60)
  readonly password: string = '';
}