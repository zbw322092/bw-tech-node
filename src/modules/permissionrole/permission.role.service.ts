import { Component } from '@nestjs/common';
import { AddPermissionRoleDto } from './interfaces/permissionrole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRole } from './permission.role.entity';
import { Repository } from 'typeorm';
import { Trycatch } from '../../lib/decorators/trycatch';
import { createByFail, createByServerError, createBySuccess, createByLoginRequired } from '../common/serverResponse/ServerResponse';
import { ICommonResponse } from '../common/interfaces/ICommonResponse';
import { uniqid } from '../../utils/uniqid';
import { IdPrefix } from '../common/const/IdPrefix';
import { IPermissionRoleService } from './interfaces/IPermissionRoleService';

enum PermissionRoleResCode {
  'permissionRolePairExist' = 'PERMISSION.ROLE.1001',
}

enum PermissionRoleResMsg {
  'permissionRolePairExist' = 'permission & role pair has exist'
}

@Component()
export class PermissionRoleService implements IPermissionRoleService {
  constructor (
    @InjectRepository(PermissionRole)
    private readonly permissionRoleRepository: Repository<PermissionRole>
  ) {}

  public async addPermissionRole (session: any, addPermissionRoleDto: AddPermissionRoleDto): Promise<ICommonResponse<{}>> {
    if (!session.userId) { return createByLoginRequired(); }

    const { roleId, permissionId } = addPermissionRoleDto;

    let permissionRolePair: PermissionRole[] = [];
    try {
      permissionRolePair = await this.permissionRoleRepository.find({ role_id: roleId, permission_id: permissionId });
    } catch (e) { return createByServerError(); }

    if (permissionRolePair.length > 0) {
      return createByFail({ code: PermissionRoleResCode.permissionRolePairExist, message: PermissionRoleResMsg.permissionRolePairExist });
    }

    try {
      await this.permissionRoleRepository.insert({
        id: uniqid(IdPrefix.PermissionRole),
        role_id: roleId,
        permission_id: permissionId
      });
      return createBySuccess({ message: 'permission & role pair create successfully', data: {} });
    } catch (e) { return createByServerError(); }
  }
}