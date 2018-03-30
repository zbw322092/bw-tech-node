import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesUsers } from "./rolesusers.entity";
import { RolesUsersService } from "./rolesusers.service";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { AddRolesUsersDto } from "./dto/rolesusers.dto";

@Module({
  imports: [TypeOrmModule.forFeature([RolesUsers])],
  components: [RolesUsersService],
  exports: [RolesUsersService]
})
export class RolesUsersModule {}