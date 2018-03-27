import { Controller, Post, Body } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { AddRoleDto, UpdateRoleDto } from "./dto/roles.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RolesService) { }

  @Post('/add_role')
  public addRole(@Body("param") addRoleDto: AddRoleDto): Promise<ICommonResponse<any>> {
    return this.roleService.addRole(addRoleDto);
  }

  public getRoleByName(name: string) {}

  @Post('/update_role')
  public updateRole(@Body("param") updateRoleDto: UpdateRoleDto): Promise<ICommonResponse<any>> {
    return this.roleService.updateRole(updateRoleDto);
  }
}