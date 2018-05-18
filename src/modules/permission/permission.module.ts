import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  components: [PermissionService]
})
export class PermissionModule {}