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
import { getManager, getRepository, Column, SelectQueryBuilder } from "typeorm";
import { PostFormat, PostOrder } from "../common/const/PostConst";
import { PostsTags } from "../poststags/poststags.entity";

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

    let query: SelectQueryBuilder<Posts> = getRepository(Posts)
      .createQueryBuilder('p')
      .select();

    let postsTagsQuery: SelectQueryBuilder<PostsTags>;
    if (getPostsDto.filter.tagIdsArr && getPostsDto.filter.tagIdsArr.length > 0) {
      postsTagsQuery = getRepository(PostsTags).createQueryBuilder('pt')
        .select('pt.post_id')
        .where(`pt.tag_id IN("${getPostsDto.filter.tagIdsArr.join('","')}")`)
    }

    if (postsTagsQuery) {
      query.where(`p.id IN (${ postsTagsQuery.getQuery() })`)
    }

    if (getPostsDto.filter.status) {
      query = query.andWhere(`p.status = "${getPostsDto.filter.status}"`);
    }
    if (getPostsDto.filter.authorIdsArr && getPostsDto.filter.authorIdsArr.length > 0) {
      query = query.andWhere(`p.author_id IN ("${getPostsDto.filter.authorIdsArr.join('","')}")`);
    }

    try {
      const resultPosts = await query
        .skip((getPostsDto.page - 1) * getPostsDto.limit)
        .take(getPostsDto.limit)
        .orderBy('p.created_at', getPostsDto.order === PostOrder.asc ? 'ASC' : 'DESC')
        .execute();
      return createBySuccess({ data: { posts: resultPosts } });
    } catch (e) { return createByServerError(); }

  }
}