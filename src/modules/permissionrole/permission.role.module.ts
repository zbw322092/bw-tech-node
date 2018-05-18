import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionRole } from "./permission.role.entity";
import { PermissionRoleController } from "./permission.role.controller";
import { PermissionRoleService } from "./permission.role.service";

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRole])],
  controllers: [PermissionRoleController],
  components: [PermissionRoleService]
})
export class PermissionRoleModule {}