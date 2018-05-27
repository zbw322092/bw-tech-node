import { Component } from "@nestjs/common";
import { AddPermissionDto } from "./interfaces/permission.dto";
import { createByFail, createBySuccess, createByServerError, createByLoginRequired } from "../common/serverResponse/ServerResponse";
import { LOGINREQUIRED, COMMONSERVERERROR } from "../common/serverResponse/Const.Error";
import { Permission } from "./permission.entity";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { IPermissionService } from "./interfaces/IPermissionService";
import { PermissionRole } from "../permissionrole/permission.role.entity";

enum PermissionResCode {
  'noMatchedPermission' = 'PERMISSION.1001',
  'notPermittedByThisRole' = 'PERMISSION.1002'
}

enum PermissionResMsg {
  'noMatchedPermission' = 'no matched permission',
  'notPermittedByThisRole' = 'operation is not permitted'
}

@Component()
export class PermissionService implements IPermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(PermissionRole)
    private readonly PermissionRoleRepository: Repository<PermissionRole>
  ) { }

  public async addPermission(session: any, addPermissionDto: AddPermissionDto): Promise<ICommonResponse<{}>> {
    const userId = session.userId;
    if (!userId) { return createByLoginRequired(); }

    try {
      await this.permissionRepository.insert({
        id: uniqid(IdPrefix.Permission),
        name: addPermissionDto.name,
        permission_type: addPermissionDto.permissionType,
        action_type: addPermissionDto.actionType,
        created_by: userId
      });
      return createBySuccess({ message: 'permisson added successfully', data: {} });
    } catch (e) {
      // TODO: log error
      return createByServerError();
    }
  }

  public async checkPermission(session: any, permissionType: string, actionType: string): Promise<ICommonResponse<{}>> {
    if (!session.userId) { return createByLoginRequired(); }

    let permission: Permission;
    try {
      permission = await this.permissionRepository.findOne({ permission_type: permissionType, action_type: actionType });
      if (!permission) { return createByFail({ code: PermissionResCode.noMatchedPermission, message: PermissionResMsg.noMatchedPermission }); }
    } catch (e) { return createByServerError(); }

    try {
      let permissionRolePair = await this.PermissionRoleRepository.findOne({ permission_id: permission.id, role_id: session.roleId });
      if (permissionRolePair) {
        return createBySuccess({ message: 'permitted', data: {} });
      } else {
        return createByFail({ code: PermissionResCode.notPermittedByThisRole, message: PermissionResMsg.notPermittedByThisRole })
      }
    } catch (e) { return createByServerError(); }
  }
}