import { Controller, Get, Post, Session, Body } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./posts.entity";
import { AddPostDto, GeneratePostsDto } from "./interface/posts.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { Client, Transport, ClientProxy, MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs/Observable";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Client({ transport: Transport.TCP, port: 8000 })
  client: ClientProxy;

  @Post('/create_post')
  public createPost(@Session() session,  @Body('param') addPostDto: AddPostDto): Promise<ICommonResponse<{}>> {
    return this.postsService.createPost(session, addPostDto);
  }

  @Post('/faker_generate_post')
  public fakerGeneratePost (@Session() session, @Body('param') generatePostDto: GeneratePostsDto): Promise<ICommonResponse<{}>> {
    const pattern = { cmd: 'faker_generate_posts' };
    const generatedPosts: Observable<AddPostDto[]> = this.client.send(pattern, generatePostDto);
    generatedPosts.subscribe((postsArr: AddPostDto[]) => {
      return postsArr.forEach((post) => {
        return this.postsService.createPost(session, post);
      });
    });
  }

}
