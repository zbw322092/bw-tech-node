import { Component } from "@nestjs/common";
import { AddRolesUsersDto, UpdateRolesUsersDto } from "./interfaces/rolesusers.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesUsers } from './rolesusers.entity';
import { Repository } from "typeorm";
import { createByFail, createBySuccess, createByServerError, createByLoginRequired } from "../common/serverResponse/ServerResponse";
import { errorRolesUsers } from "../common/serverResponse/Const.Error";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { IRolesUsersService } from "./interfaces/IRolesUsersService";

enum RolesUsersResCode {
  'roleUserPairExist' = 'ROLES.USERS.1001',
}

enum RolesUsersResMsg {
  'roleUserPairExist' = 'role & user pair has exist'
}

@Component()
export class RolesUsersService implements IRolesUsersService {
  constructor(
    @InjectRepository(RolesUsers)
    private rolesUsersRepository: Repository<RolesUsers>
  ) { }

  public async addRolesUsers(session: any, addRolesUsersDto: AddRolesUsersDto): Promise<ICommonResponse<{}>> {
    if (!session.userId) {
      // TODO: only owner of this site can add role and user pair
      return createByLoginRequired();
    }

    const { userId, roleId } = addRolesUsersDto;
    let existingRecord: RolesUsers | null;
    try {
      const existingRecord = await this.rolesUsersRepository.findOne({ user_id: userId });
      if (existingRecord) {
        return createByFail({ code: RolesUsersResCode.roleUserPairExist, message: RolesUsersResMsg.roleUserPairExist });
      }
    } catch (e) { return createByServerError(); }


    try {
      await this.rolesUsersRepository.insert({
        id: uniqid(IdPrefix.RolesUsers),
        user_id: userId,
        role_id: roleId
      });
      return createBySuccess({ message: 'add role and user relation successfully', data: {} });
    } catch (e) { return createByServerError(); }

  }

  public async updateRolesUsers(session: any, updateRolesUsersDto: UpdateRolesUsersDto): Promise<ICommonResponse<{}>> {
    if (!session.userId) {
      // TODO: only owner of this site can add role and user pair
      return createByLoginRequired();
    }

    const { id, roleId } = updateRolesUsersDto;

    try {
      await this.rolesUsersRepository.update({ id }, { role_id: roleId });
      return createBySuccess({ message: 'update role & user relation successfully', data: {} });
    } catch (e) { return createByServerError(); }
  }
}