import { Length, IsEmail, IsIn } from "class-validator";

export class AddInvitationDto {
  @Length(1, 50)
  roleId: string = '';

  @Length(5, 191)
  @IsEmail()
  email: string = '';

  @Length(1, 50)
  createdBy: string = '';
}

type StatusType = 'pending' | 'sent' |'accepted';
export class UpdateStatusDto {
  token: string = '';

  @Length(1,50)
  @IsIn(['pending', 'sent', 'accepted'])
  status: StatusType;

  @Length(1,50)
  updatedBy: string;
}