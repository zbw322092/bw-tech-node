import { Length } from "class-validator";

export class AddPermissionRoleDto {
  @Length(1,50)
  roleId: string = '';

  @Length(1,50)
  permissionId: string = '';
}