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

@Component()
export class PermissionService implements IPermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

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
    } catch(e) {
      // TODO: log error
      return createByServerError();
    }
  }
}