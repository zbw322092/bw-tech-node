import { Component } from "@nestjs/common";
import { IPostsTagsService } from "./interfaces/IPostsTagsService";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";
import { PostsTags } from "./poststags.entity";
import { AddPostTagDto } from "./interfaces/poststags.dto";
import { PermissionService } from "../permission/permission.service";
import { PermissionConst } from "../common/const/PermissionConst";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { createByFail, createByServerError, createBySuccess } from "../common/serverResponse/ServerResponse";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";

enum PostsTagsResCode {
  'postTagPairExisted' = 'POSTSTAGS.1001'
}

enum PostsTagsResMsg {
  'postTagPairExisted' = 'this post & tag pair already existed'
}

@Component()
export class PostsTagsService implements IPostsTagsService {

  constructor(
    @InjectRepository(PostsTags)
    private readonly postsTagsRepository: Repository<PostsTags>,
    private readonly permissionService: PermissionService
  ) {}

  public async addPostTag (session: any, addPostTagDto: AddPostTagDto): Promise<ICommonResponse<{}>> {
    const postPermission = await this.permissionService.checkPermission(session, PermissionConst.PermissionType.post, PermissionConst.ActionType.add);
    if (postPermission.code !== '0000') { return postPermission; }
    const tagPermission = await this.permissionService.checkPermission(session, PermissionConst.PermissionType.tag, PermissionConst.ActionType.add);
    if (postPermission.code !== '0000') { return tagPermission; }

    try {
      const checkeExistence = await getRepository(PostsTags)
        .createQueryBuilder()
        .select()
        .where('post_id = :postId', { postId: addPostTagDto.postId })
        .andWhere(`tag_id IN ("${addPostTagDto.tagIdsArr.join('","')}")`)
        .printSql()
        .execute();

        if (checkeExistence.length) {
          return createByFail({ code: PostsTagsResCode.postTagPairExisted, message: PostsTagsResMsg.postTagPairExisted });
        }
    } catch (e) { return createByServerError(); }


    const postsTagsInstancesArr = addPostTagDto.tagIdsArr.map((tagId: string) =>  {
      return this.postsTagsRepository.create({
        id: uniqid(IdPrefix.PostsTags),
        post_id: addPostTagDto.postId,
        tag_id: tagId
      });
    });

    try {
      await this.postsTagsRepository.save(postsTagsInstancesArr);
      return createBySuccess({ message: 'add post & tag pairs successfully', data: {} });
    } catch (e) { return createByServerError(); }
  }
}