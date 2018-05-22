import { Component } from "@nestjs/common";
import { IPostsTagsService } from "./interfaces/IPostsTagsService";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
      const checkExistence = await this.postsTagsRepository.findOne({ post_id: addPostTagDto.postId, tag_id: addPostTagDto.tagId });
      if (checkExistence) { return createByFail({ code: PostsTagsResCode.postTagPairExisted, message: PostsTagsResMsg.postTagPairExisted }); }
    } catch (e) { createByServerError(); }

    try {
      await this.postsTagsRepository.insert({
        id: uniqid(IdPrefix.PostsTags),
        post_id: addPostTagDto.postId,
        tag_id: addPostTagDto.tagId
      });
      return createBySuccess({ message: 'add post & tag pair successfully', data: {} });
    } catch (e) { createByServerError(); }
  }
}