import { Component } from "@nestjs/common";
import { AddRolesUsersDto, UpdateRolesUsersDto } from "./dto/rolesusers.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesUsers } from './rolesusers.entity';
import { Repository } from "typeorm";
import { createByFail, createBySuccess } from "../common/serverResponse/ServerResponse";
import { errorRolesUsers } from "../common/serverResponse/Const.Error";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";

@Component()
export class RolesUsersService {
  constructor(
    @InjectRepository(RolesUsers)
    private rolesUsersRepository: Repository<RolesUsers>
  ) { }

  public async addRolesUsers(addRolesUsersDto: AddRolesUsersDto): Promise<ICommonResponse<any>> {
    const { user_id, role_id } = addRolesUsersDto;
    const existingRecord = await this.rolesUsersRepository.findOne({ user_id });
    if (existingRecord) {
      return createByFail({ code: errorRolesUsers('0001'), message: 'user has been assigned role' });
    }
    const newRecord = this.rolesUsersRepository.create({
      id: uniqid(IdPrefix.RolesUsers),
      user_id, role_id
    });
    await this.rolesUsersRepository.save(newRecord);

    return createBySuccess({ message: 'add role and user relation successfully', data: {} });
  }

  public async updateRolesUsers(updateRolesUsersDto: UpdateRolesUsersDto): Promise<ICommonResponse<any>> {
    const { user_id, role_id } = updateRolesUsersDto;
    const existingRecord = await this.rolesUsersRepository.findOne({ user_id });
    if (!existingRecord) {
      return createByFail({ code: errorRolesUsers('0002'), message: 'no such user-role relation record' });
    }

    // TODO
    // await this.rolesUsersRepository.update({}, { user_id, role_id });
    // return createBySuccess({ data: {} });
  }
}