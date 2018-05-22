import { Controller, Get, Post, Session, Body } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./posts.entity";
import { CreatePostDto } from "./interface/posts.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Post('/create_post')
  public createPost(@Session() session,  @Body('param') createPostDto: CreatePostDto): Promise<ICommonResponse<{}>> {
    return this.postsService.createPost(session, createPostDto);
  }

}
