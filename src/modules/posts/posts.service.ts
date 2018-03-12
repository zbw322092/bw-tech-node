import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { Repository } from "typeorm/repository/Repository";

@Component()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>
  ) {}

  public async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }
}