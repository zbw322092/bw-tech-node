import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm/repository/Repository";
import { createBySuccess } from "../common/serverResponse/ServerResponse";

@Component()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  public async addUser(user: Users) {
    await this.usersRepository.save(user);
    createBySuccess({ message: 'user register successfully', data: {} });
  }
}