import { Length, IsEmail } from "class-validator";

export class AddInvitationDto {
  @Length(1, 30)
  roleId: string = '';

  @Length(5, 191)
  @IsEmail()
  email: string = '';

  @Length(1, 30)
  createdBy: string = '';
}