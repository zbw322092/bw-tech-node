import { Length } from 'class-validator';

export class AddPermissionRoleDto {
  @Length(1, 50)
  public roleId: string = '';

  @Length(1, 50)
  public permissionId: string = '';
}