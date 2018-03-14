import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  components: [AuthService]
})
export class AuthModule {}