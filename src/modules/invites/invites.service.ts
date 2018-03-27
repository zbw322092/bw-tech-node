import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invites } from "./invites.entity";
import { Repository } from "typeorm";

@Component()
export class InvitesService {
  constructor(
    @InjectRepository(Invites)
    private readonly invitesRepository: Repository<Invites>
  ) { }


  /**
   * findInvitedUser
   */
  public async findInvitedUser(email: string): Promise<{invitedUsers: Invites[], invitedUsersCount: number}> {
    const [ invitedUsers, invitedUsersCount ] = await this.invitesRepository.findAndCount({ email });
    return {
      invitedUsers,
      invitedUsersCount
    };
  }
}