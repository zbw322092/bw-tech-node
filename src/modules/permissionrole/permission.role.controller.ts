import { Controller, Session, Post, Body } from "@nestjs/common";
import { AddPermissionRoleDto } from "./interfaces/permissionrole.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { PermissionRoleService } from "./permission.role.service";

@Controller('permissionrole')
export class PermissionRoleController {
  constructor(private readonly permissionRoleService: PermissionRoleService) {}

  @Post('add_permission_role')
  public addPermissionRole (@Session() session, @Body('param') addPermissionRoleDto: AddPermissionRoleDto): Promise<ICommonResponse<{}>>{
    return this.permissionRoleService.addPermissionRole(session, addPermissionRoleDto);
  }
}