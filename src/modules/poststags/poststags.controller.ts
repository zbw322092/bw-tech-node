import { Controller, Session, Body, Post } from "@nestjs/common";
import { PostsTagsService } from "./poststags.service";
import { AddPostTagDto } from "./interfaces/poststags.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";

@Controller('/poststags')
export class PostsTagsController {
  constructor(
    private readonly poststagsService: PostsTagsService
  ) {}

  @Post('/add_post_tag')
  public async addPostTag (@Session() session, @Body('param') addPostTagDto: AddPostTagDto): Promise<ICommonResponse<{}>> {
    return this.poststagsService.addPostTag(session, addPostTagDto);
  }
}
