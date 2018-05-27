import { Length } from "class-validator";

export class AddPermissionDto {
  @Length(1, 200)
  name: string = '';

  @Length(1, 200)
  permissionType: string = '';

  @Length(1, 200)
  actionType: string = '';
}