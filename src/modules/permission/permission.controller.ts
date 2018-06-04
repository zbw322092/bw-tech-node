import { Controller, Post, Session, Body } from '@nestjs/common';
import { AddPermissionDto } from './interfaces/permission.dto';
import { createByFail } from '../common/serverResponse/ServerResponse';
import { PermissionService } from './permission.service';
import { ICommonResponse } from '../common/interfaces/ICommonResponse';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('add_permission')
  public addPermission (@Session() session, @Body('param') addPermissionDto: AddPermissionDto): Promise<ICommonResponse<{}>> {
    return this.permissionService.addPermission(session, addPermissionDto);
  }
}