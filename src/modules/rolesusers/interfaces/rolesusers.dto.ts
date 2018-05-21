import { Length } from "class-validator";

export class AddRolesUsersDto {
  @Length(1, 50)
  roleId: string = '';

  @Length(1,50)
  userId: string = '';
}

export class UpdateRolesUsersDto {
  @Length(1, 50)
  id: string = '';

  @Length(1,50)
  roleId: string = '';
}