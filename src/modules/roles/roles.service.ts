import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from './roles.entity';
import { Repository } from "typeorm";
import { AddRoleDto } from "./dto/roles.dto";
import { uniqid } from "../../utils/uniqid";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createByFail, createBySuccess } from "../common/serverResponse/ServerResponse";
import { errorRole } from "../common/serverResponse/Const.Error";

@Component()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>
  ) { }

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
      created_by: 'temp-system-admin'
    });
    await this.rolesRepository.save(newRole);
    return createBySuccess({ message: 'create role success', data: {} });
  }

  public async getRoleByName(name: string): Promise<Roles> {
    return await this.rolesRepository.findOne({ name });
  }

}