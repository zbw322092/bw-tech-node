import { Controller, Post, Session, Body } from "@nestjs/common";
import { AddRolesUsersDto, UpdateRolesUsersDto } from "./interfaces/rolesusers.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { RolesUsersService } from "./rolesusers.service";

@Controller('rolesusers')
export class RolesUsersController {
  constructor(
    private readonly rolesUsersService: RolesUsersService
  ) {}

  @Post('add_roles_users')
  public async addRolesUsers(@Session() session, @Body('param') addRolesUsersDto: AddRolesUsersDto): Promise<ICommonResponse<{}>> {
    return this.rolesUsersService.addRolesUsers(session, addRolesUsersDto);
  }

  @Post('update_roles_users')
  public async updateRolesUsers(@Session() session, @Body('param') updateRolesUsersDto: UpdateRolesUsersDto): Promise<ICommonResponse<{}>> {
    return this.rolesUsersService.updateRolesUsers(session, updateRolesUsersDto);
  }
}