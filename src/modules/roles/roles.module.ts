import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';
import { RoleController } from './roles.controller';
import { RequestParamValidationMiddleware } from '../common/middlewares/RequestParamValidationMiddleware';
import { UpdateRoleDto, AddRoleDto } from './dto/roles.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RoleController],
  components: [RolesService],
  exports: [RolesService]
})
export class RolesModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(RequestParamValidationMiddleware).with(AddRoleDto).forRoutes(
      { path: '/roles/add_role', method: RequestMethod.POST }
    );

    consumer.apply(RequestParamValidationMiddleware).with(UpdateRoleDto).forRoutes(
      { path: '/roles/update_role', method: RequestMethod.POST }
    );
  }
}