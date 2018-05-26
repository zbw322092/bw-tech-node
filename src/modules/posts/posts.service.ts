import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { Repository } from "typeorm/repository/Repository";
import { AddPostDto, GetPostsDto } from "./interface/posts.dto";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { PermissionService } from "../permission/permission.service";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { PermissionConst } from "../common/const/PermissionConst";
import { getCurrentDatetime } from "../../utils/timeHandler";
import { createByServerError, createBySuccess, createByLoginRequired } from "../common/serverResponse/ServerResponse";
import { getManager, getRepository, Column } from "typeorm";
import { PostFormat, PostOrder } from "../common/const/PostConst";

@Component()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly permissionService: PermissionService
  ) { }

  public async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  public async createPost(session: any, addPostDto: AddPostDto): Promise<ICommonResponse<{}>> {
    const permissionResult = await this.permissionService.checkPermission(session, PermissionConst.PermissionType.post, PermissionConst.ActionType.add);
    if (permissionResult.code !== '0000') {
      return permissionResult;
    }

    const post = this.postsRepository.create({
      id: uniqid(IdPrefix.Post),
      title: addPostDto.title,
      html: addPostDto.html,
      plaintext: addPostDto.plaintext,
      feature_image: addPostDto.featureImage,
      featured: addPostDto.featured,
      status: addPostDto.status,
      visibility: addPostDto.visibility,
      meta_title: addPostDto.metaTitle,
      meta_description: addPostDto.metaDescription,
      author_id: session.userId,
      created_by: session.userId,
      published_by: addPostDto.status === 'published' ? session.userId : null,
      published_at: addPostDto.status === 'published' ? getCurrentDatetime() : null,
      custom_excerpt: addPostDto.customExcerpt
    });

    try {
      await this.postsRepository.insert(post);
      return createBySuccess({ message: 'add post successfully', data: {} });
    } catch (e) { return createByServerError(); }
  }

  public async getPosts(session: any, getPostsDto: GetPostsDto): Promise<ICommonResponse<any>> {
    if (!session.userId) {
      // TODO: modify permission rule
      return createByLoginRequired();
    }

    try {
      const postsResults = await getRepository(Posts)
        .createQueryBuilder('posts')
        .select()
        .where('posts.status = :postStatus', { postStatus: getPostsDto.filter.status })
        .andWhere(`posts.author_id IN ("${getPostsDto.filter.authorIdsArr.join('","')}")`)
        .take(getPostsDto.limit)
        .orderBy('posts.created_at', getPostsDto.order === PostOrder.asc ? 'ASC' : 'DESC')
        .execute();
      return createBySuccess({ data: { posts: postsResults } });
    } catch (e) { return createByServerError(); }

  }
}