import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invites } from "./invites.entity";
import { Repository } from "typeorm";
import { AddInvitationDto } from "./dto/invites.dto";
import * as crypto from 'crypto';
import { TimeConst } from "../common/const/TimeConst";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { Roles } from "../roles/roles.entity";
import { RequestErrorException } from "../common/exceptions/exceptions";

@Component()
export class InvitesService {
  constructor(
    @InjectRepository(Invites)
    private readonly invitesRepository: Repository<Invites>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>
  ) { }

  public async findInvitationByEmail(email: string): Promise<{invitedUsers: Invites[], invitedUsersCount: number}> {
    const [ invitedUsers, invitedUsersCount ] = await this.invitesRepository.findAndCount({ email });
    return {
      invitedUsers,
      invitedUsersCount
    };
  }

  public async addInvitation(addInvitationDto: AddInvitationDto) {
    const { roleId, email, createdBy } = addInvitationDto;
    const hash = crypto.createHash('sha256');
    const expires = Date.now() + TimeConst.TEN_MINUTES_MS;
    hash.update(String(expires));
    hash.update(email.toLocaleLowerCase());
    const tokenText = [expires, email, hash.digest('base64')].join('|');
    const token = new Buffer(tokenText).toString('base64');

    const roleRecord = await this.rolesRepository.findOneById(roleId);
    if (!roleRecord) { throw new RequestErrorException(); }

    const invitation = this.invitesRepository.create({
      id: uniqid(IdPrefix.Invites),
      role_id: roleId,
      status: 'pending',
      token,
      email,
      expires,
      created_by: createdBy
    });

    return await this.invitesRepository.save(invitation);
  }

  public async updateInvitation() {
    
  }
}