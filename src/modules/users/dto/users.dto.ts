import { Length, IsEmail } from 'class-validator';

export class SignupDto {
  @Length(5, 191)
  @IsEmail()
  public readonly email: string = '';

  @Length(1, 191)
  public readonly name: string = '';

  @Length(6, 60)
  public readonly password: string = '';

  @Length(4, 4)
  public readonly captcha: string = '';
}

export class EmailAvaliableDto {
  @Length(5, 191)
  @IsEmail()
  public readonly email: string = '';
}

export class NameAvaliableDto {
  @Length(1, 191)
  public readonly name: string = '';
}

export class ActiveAccountDto {
  @Length(1, 300)
  public readonly token: string = '';
}

export class SigninDto {
  @Length(5, 191)
  @IsEmail()
  public readonly email: string = '';

  @Length(6, 60)
  public readonly password: string = '';
}