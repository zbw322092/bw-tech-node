import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invites } from "./invites.entity";
import { InvitesService } from "./invites.service";

@Module({
  imports: [TypeOrmModule.forFeature([Invites])],
  components: [InvitesService],
  exports: [InvitesService]
})
export class InviteModule {}