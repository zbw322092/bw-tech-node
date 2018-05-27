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
import { Tags } from "../tags/tags.entity";
import { GetPostsVo, TagsInfo, PostsInfo } from "./interface/posts.vo";
import { IPostsSerrvice } from "./interface/IPostsSerrvice";

@Component()
export class PostsService implements IPostsSerrvice {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly permissionService: PermissionService
  ) { }

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

  public async getPosts(session: any, getPostsDto: GetPostsDto): Promise<ICommonResponse<GetPostsVo | {}>> {
    if (!session.userId) {
      // TODO: modify permission rule
      return createByLoginRequired();
    }

    // start build query
    let query: SelectQueryBuilder<Posts> = getRepository(Posts)
      .createQueryBuilder()
      .select(`posts.id, posts.title,
        ${getPostsDto.format.includes('plaintext') ? 'posts.plaintext,' : ''}
        ${getPostsDto.format.includes('html') ? 'posts.html,' : ''}
        posts.feature_image, posts.featured, posts.status, posts.meta_title,
        posts.meta_description, posts.author_id, posts.created_at, posts.created_by,
        posts.updated_at, posts.updated_by, posts.published_at, posts.published_by, posts.custom_excerpt
      `);

    let postsTagsQuery: SelectQueryBuilder<PostsTags>;
    if (getPostsDto.filter.tagIdsArr && getPostsDto.filter.tagIdsArr.length > 0) {
      postsTagsQuery = getRepository(PostsTags).createQueryBuilder('pt')
        .select('pt.post_id')
        .where(`pt.tag_id IN("${getPostsDto.filter.tagIdsArr.join('","')}")`)
    }

    if (postsTagsQuery) {
      query.where(`id IN (${postsTagsQuery.getQuery()})`)
    }

    if (getPostsDto.filter.status) {
      query = query.andWhere(`status = "${getPostsDto.filter.status}"`);
    }
    if (getPostsDto.filter.authorIdsArr && getPostsDto.filter.authorIdsArr.length > 0) {
      query = query.andWhere(`author_id IN ("${getPostsDto.filter.authorIdsArr.join('","')}")`);
    }

    let resultPosts: Array<PostsInfo>;
    try {
      resultPosts = await query
        .skip((getPostsDto.page - 1) * getPostsDto.limit)
        .take(getPostsDto.limit)
        .orderBy('created_at', getPostsDto.order === PostOrder.asc ? 'ASC' : 'DESC')
        .execute();
    } catch (e) { return createByServerError(); }

    const getTagsQueryArr = resultPosts.map((post: PostsInfo) => {
      return getRepository(PostsTags)
        .createQueryBuilder('pt')
        .select('pt.tag_id AS tag_id, tg.name AS tag_name')
        .innerJoin(Tags, 'tg', 'pt.tag_id = tg.id')
        .where(`pt.post_id = "${post.id}"`);
    });

    return Promise.all(getTagsQueryArr.map((query) => { return query.execute(); })).then((tagsResults: Array<Array<TagsInfo>>) => {
      resultPosts.forEach((post, index) => {
        post.tagsInfo = tagsResults[index];
      });
      return createBySuccess({ data: { posts: resultPosts } });
    }).catch((e) => { return createByServerError(); })

  }
}