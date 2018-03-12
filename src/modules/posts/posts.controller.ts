import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./posts.entity";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }
}
