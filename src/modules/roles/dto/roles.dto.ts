import { Length } from "class-validator";
import { JsonProperty } from "json-typescript-mapper";

export class AddRoleDto {
  @Length(1,50)
  name: string = '';

  @Length(1,1000)
  description: string = '';
}

export class UpdateRoleDto {
  id: string = '';

  @Length(1,50)
  name: string = '';

  @Length(1,1000)
  description: string = '';
}