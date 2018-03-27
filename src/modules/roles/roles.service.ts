import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from './roles.entity';
import { Repository } from "typeorm";
import { AddRoleDto, UpdateRoleDto } from "./dto/roles.dto";
import { uniqid } from "../../utils/uniqid";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createByFail, createBySuccess } from "../common/serverResponse/ServerResponse";
import { errorRole } from "../common/serverResponse/Const.Error";
import { getNowDatetime } from "../../utils/timeHandler";

@Component()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>
  ) { }


  private async getRoleByName(name: string): Promise<Roles> {
    return await this.rolesRepository.findOne({ name });
  }

  private async getRoleById(id: string): Promise<Roles> {
    return await this.rolesRepository.findOneById(id);
  }

  public async addRole(addRoleDto: AddRoleDto): Promise<ICommonResponse<any>> {
    const { name, description } = addRoleDto;
    // TODO  role can only be added by owner

    const role = await this.getRoleByName(name);
    if (role) {
      return createByFail({ code: errorRole('0001'), message: 'role has existed' });
    }

    const newRole: Roles = this.rolesRepository.create({
      id: uniqid('role-'),
      name,
      description,
      // TODO add real user
      created_by: 'temp-system-admin'
    });
    await this.rolesRepository.save(newRole);
    return createBySuccess({ message: 'create role success', data: {} });
  }

  public async updateRole(updateRoleDto: UpdateRoleDto): Promise<ICommonResponse<any>> {
    const { id, name, description } = updateRoleDto;
    // TODO  role can only be added by owner

    const role = await this.getRoleById(id);
    if (!role) {
      return createByFail({ code: errorRole('0002'), message: 'no such role' });
    }
    const sameNameRole = await this.rolesRepository
      .createQueryBuilder("role")
      .select()
      .where("role.name = :name AND role.id != :id", { name, id })
      .getOne();
    if (sameNameRole) {
      return createByFail({ code: errorRole('0003'), message: 'role name has been taken, cannot duplicate.' });
    }

    await this.rolesRepository.updateById(id, {
      name,
      description,
      updated_at: getNowDatetime(),
      updated_by: 'temp-system-admin' // TODO add real user
    });

    return createBySuccess({ message: 'role updated successfully', data: {} });
  }

}