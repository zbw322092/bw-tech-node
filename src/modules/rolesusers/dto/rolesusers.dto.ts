import { Length } from "class-validator";

export class AddRolesUsersDto {
  @Length(1, 50)
  role_id: string = '';

  @Length(1,50)
  user_id: string = '';
}

export class UpdateRolesUsersDto {
  @Length(1, 50)
  role_id: string = '';

  @Length(1,50)
  user_id: string = '';

}