import { Length } from 'class-validator';

export class AddRolesUsersDto {
  @Length(1, 50)
  public roleId: string = '';

  @Length(1, 50)
  public userId: string = '';
}

export class UpdateRolesUsersDto {
  @Length(1, 50)
  public id: string = '';

  @Length(1, 50)
  public roleId: string = '';
}