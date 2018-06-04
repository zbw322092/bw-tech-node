import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { IncomingRequestMappingMiddleware } from './common/middlewares/IncomingRequestMappingMiddleware';
import { InviteModule } from './invites/invites.module';
import { RolesModule } from './roles/roles.module';
import { CaptchaModule } from './captcha/captcha.module';
import { RolesUsersModule } from './rolesusers/rolesusers.module';
import nconf from '../config/config';
import { PermissionModule } from './permission/permission.module';
import { PermissionRoleModule } from './permissionrole/permission.role.module';
import { TagsModule } from './tags/tags.module';
import { PostsTagsModule } from './poststags/poststags.module';

@Module({
  imports: [TypeOrmModule.forRoot(nconf.get('database')), UsersModule, PostsModule,
    InviteModule, RolesUsersModule, RolesModule, CaptchaModule, PermissionModule,
    PermissionRoleModule, TagsModule, PostsTagsModule]
})
export class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(IncomingRequestMappingMiddleware).forRoutes(
      { path: '/route', method: RequestMethod.POST }
    );
  }
}