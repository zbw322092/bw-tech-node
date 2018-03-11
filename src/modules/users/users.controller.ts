import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}