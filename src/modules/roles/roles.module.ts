import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roles } from "./roles.entity";
import { RolesService } from "./roles.service";
import { RoleController } from "./roles.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RoleController],
  components: [RolesService],
  exports: [RolesService]
})
export class RolesModule{}