import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreatePostDto } from "./interface/posts.dto";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { PermissionService } from "../permission/permission.service";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { PermissionConst } from "../common/const/PermissionConst";
import { getCurrentDatetime } from "../../utils/timeHandler";
import { createByServerError, createBySuccess } from "../common/serverResponse/ServerResponse";

@Component()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly permissionService: PermissionService
  ) {}

  public async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  public async createPost(session: any, createPostDto: CreatePostDto): Promise<ICommonResponse<{}>> {
    const permissionResult = await this.permissionService.checkPermission(session, PermissionConst.PermissionType.post, PermissionConst.ActionType.add);
    if (permissionResult.code !== '0000') {
      return permissionResult;
    }

    const post = this.postsRepository.create({
      id: uniqid(IdPrefix.Post),
      title: createPostDto.title,
      html: createPostDto.html,
      plaintext: createPostDto.plaintext,
      feature_image: createPostDto.featureImage,
      featured: createPostDto.featured,
      status: createPostDto.status,
      visibility: createPostDto.visibility,
      meta_title: createPostDto.metaTitle,
      meta_description: createPostDto.metaDescription,
      author_id: session.userId,
      created_by: session.userId,
      published_by: createPostDto.status === 'published' ? session.userId : null,
      published_at: createPostDto.status === 'published' ? getCurrentDatetime() : null,
      custom_excerpt: createPostDto.customExcerpt
    });

    try {
      await this.postsRepository.insert(post);
      return createBySuccess({ message: 'add post successfully', data: {} });
    } catch (e) { return createByServerError(); }
  }
}