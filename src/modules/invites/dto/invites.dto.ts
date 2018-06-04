import { Length, IsEmail, IsIn } from 'class-validator';

export class AddInvitationDto {
  @Length(1, 50)
  public roleId: string = '';

  @Length(5, 191)
  @IsEmail()
  public email: string = '';

  @Length(1, 50)
  public createdBy: string = '';
}

type StatusType = 'pending' | 'sent' |'accepted';
export class UpdateStatusDto {
  public token: string = '';

  @Length(1, 50)
  @IsIn(['pending', 'sent', 'accepted'])
  public status: StatusType;

  @Length(1, 50)
  public updatedBy: string;
}