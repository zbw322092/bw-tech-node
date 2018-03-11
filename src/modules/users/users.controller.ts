import { Controller, Body, Post, Get, Req, Delete } from "@nestjs/common";
import { Service } from "../database/service.interface";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  
  private usersService: Service<User>;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  // Create
  @Post('users')
  public async addUser(@Body('user') user: User): Promise<User> {
    return await this.usersService.add(user);
  }

  // retrieve
  @Get('users')
  public async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get('users/:id')
  public async getUser(@Req() req): Promise<User> {
    return req.user;
  }

  // Update
  @Post('users/:id')
  public async replaceUser(@Req() req, @Body('user') user): Promise<User> {
    return await this.usersService.update(user);
  }

  // Delete
  @Delete('users/:id')
  public async deleteUser(@Req() req) {
    const existingUser = req.user;

    return await this.usersService.remove(existingUser);
  }

}