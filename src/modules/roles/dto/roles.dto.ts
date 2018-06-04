import { Length } from 'class-validator';
import { JsonProperty } from 'json-typescript-mapper';

export class AddRoleDto {
  @Length(1, 50)
  public name: string = '';

  @Length(1, 1000)
  public description: string = '';
}

export class UpdateRoleDto {
  public id: string = '';

  @Length(1, 50)
  public name: string = '';

  @Length(1, 1000)
  public description: string = '';
}