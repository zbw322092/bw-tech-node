import { Controller, Get, Post, Session, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './posts.entity';
import { AddPostDto, GeneratePostsDto, GetPostsDto } from './interface/posts.dto';
import { ICommonResponse } from '../common/interfaces/ICommonResponse';
import { Client, Transport, ClientProxy, MessagePattern } from '@nestjs/microservices';
import { createByFail, createBySuccess, createByServerError } from '../common/serverResponse/ServerResponse';
import { GetPostsVo } from './interface/posts.vo';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) { }

  @Client({ transport: Transport.TCP, port: 8000 })
  public client: ClientProxy;

  @Post('/create_post')
  public createPost(@Session() session, @Body('param') addPostDto: AddPostDto): Promise<ICommonResponse<{}>> {
    return this.postsService.createPost(session, addPostDto);
  }

  @Post('/get_posts')
  public getPosts(@Session() session, @Body('param') getPostsDto: GetPostsDto): Promise<ICommonResponse<GetPostsVo | {}>> {
    return this.postsService.getPosts(session, getPostsDto);
  }

  @Post('/faker_generate_post')
  public async fakerGeneratePost(@Session() session, @Body('param') generatePostDto: GeneratePostsDto): Promise<ICommonResponse<any>> {
    const pattern = { cmd: 'faker_generate_posts' };
    const generatedPosts = this.client.send<AddPostDto[]>(pattern, generatePostDto);

    return generatedPosts.toPromise().then((postsArr) => {
      let successCount: number = 0;
      let failCount: number = 0;
      return Promise.all(postsArr.map((post) => this.postsService.createPost(session, post) )).then((results) => {
        results.forEach((value) => {
          if (value.code === '0000') {
            ++successCount;
          } else { ++failCount; }
        });

        return createBySuccess({
          data: {
            totalCount: successCount + failCount,
            successCount,
            failCount
          }
        });
      }).catch((e) => createByServerError() );
    });

    /** Another version using await
     * 
     * return generatedPosts.toPromise().then(async (postsArr) => {
     *   let successCount: number = 0;
     *   let failCount: number = 0;
     *   for (let i = 0, len = postsArr.length; i < len; i++) {
     *     const r = await this.postsService.createPost(session, postsArr[i]);
     *     if (r.code === '0000') {
     *       ++successCount;
     *     } else {
     *       ++failCount;
     *     }
     *   }
     *   return createBySuccess({
     *     data: {
     *       totalCount: successCount + failCount,
     *       successCount,
     *       failCount
     *     }
     *   });
     * 
     * }).catch((e) => { return createByServerError(); });
     */
  }
}
