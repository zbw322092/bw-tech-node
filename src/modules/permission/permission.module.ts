import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RequestParamValidationMiddleware } from '../common/middlewares/RequestParamValidationMiddleware';
import { AddPermissionDto } from './interfaces/permission.dto';
import { PermissionRole } from '../permissionrole/permission.role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionRole])],
  controllers: [PermissionController],
  components: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(AddPermissionDto).forRoutes(
      { path: '/permission/add_permission', method: RequestMethod.POST }
    );
  }
}