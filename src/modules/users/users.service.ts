import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm/repository/Repository";

@Component()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
}