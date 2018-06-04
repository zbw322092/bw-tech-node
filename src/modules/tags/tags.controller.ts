import { Controller, Session, Body, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AddTagDto } from './interfaces/tags.dto';
import { ICommonResponse } from '../common/interfaces/ICommonResponse';
import { Tags } from './tags.entity';

@Controller('/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService
  ) {}

  @Post('/add_tag')
  public async addTag (@Session() session, @Body('param') addTagDto: AddTagDto): Promise<ICommonResponse<{}>> {
    return this.tagsService.addTag(session, addTagDto);
  }

  @Post('/get_all_tags')
  public async getAllTags (@Session() session): Promise<ICommonResponse<{ tags: Tags[] } | {}>> {
    return this.tagsService.getAllTags(session);
  }
}