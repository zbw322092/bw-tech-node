export class AddRoleDto {
  name: string;
  description: string;
}

export class UpdateRoleDto {
  id: string;
  name?: string;
  description?: string;
}