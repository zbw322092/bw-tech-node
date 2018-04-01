import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invites } from "./invites.entity";
import { InvitesService } from "./invites.service";
import { Roles } from "../roles/roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Invites, Roles])],
  components: [InvitesService],
  exports: [InvitesService]
})
export class InviteModule {}