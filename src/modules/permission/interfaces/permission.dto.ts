import { Length } from 'class-validator';

export class AddPermissionDto {
  @Length(1, 200)
  public name: string = '';

  @Length(1, 200)
  public permissionType: string = '';

  @Length(1, 200)
  public actionType: string = '';
}