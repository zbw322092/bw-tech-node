import { Component } from "@nestjs/common";
import { ITagsService } from "./interfaces/ITagsService";
import { Repository } from "typeorm";
import { Tags } from "./tags.entity";
import { AddTagDto } from "./interfaces/tags.dto";
import { ICommonResponse } from "../common/interfaces/ICommonResponse";
import { PermissionService } from "../permission/permission.service";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionConst } from "../common/const/PermissionConst";
import { createByServerError, createByFail, createBySuccess, createByLoginRequired } from "../common/serverResponse/ServerResponse";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";
import { getCurrentDatetime } from "../../utils/timeHandler";

enum TagsResCode {
  'DuplicatedTagName' = 'TAGS.1001'
}

enum TagsResMsg {
  'DuplicatedTagName' = 'this tag name alreay existed'
}

@Component()
export class TagsService implements ITagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
    private readonly permissionService: PermissionService
  ) { }

  public async addTag(session: any, addTagDto: AddTagDto): Promise<ICommonResponse<{}>> {
    const permissionResult = await this.permissionService.checkPermission(session, PermissionConst.PermissionType.tag, PermissionConst.ActionType.add);
    if (permissionResult.code !== '0000') { return permissionResult; }

    try {
      const existedTagName = await this.tagsRepository.findOne({ name: addTagDto.name });
      if (existedTagName) {
        return createByFail({ code: TagsResCode.DuplicatedTagName, message: TagsResMsg.DuplicatedTagName });
      }
    } catch (e) { return createByServerError(); }

    const tagInstance = this.tagsRepository.create({
      id: uniqid(IdPrefix.Tags),
      name: addTagDto.name,
      description: addTagDto.description,
      feature_image: addTagDto.featureImage,
      parent_id: addTagDto.parentId,
      visibility: addTagDto.visibility,
      meta_title: addTagDto.metaTitle,
      meta_description: addTagDto.metaDescription,
      created_at: getCurrentDatetime(),
      created_by: session.userId
    });

    try {
      await this.tagsRepository.insert(tagInstance);
      return createBySuccess({ message: 'create new tag successfully', data: {} });
    } catch (e) { createByServerError(); }
  }

  public async getAllTags(session: any): Promise<ICommonResponse<{ tags: Tags[] } | {}>> {
    if (!session.userId) {
      // TODO: normal users can only browser tags created by themselves
      return createByLoginRequired();
    }

    try {
      const allTags = await this.tagsRepository.query('SELECT tags.id FROM tags');
      return createBySuccess({ data: { tags: allTags } })
    } catch { return createByServerError(); }

  }
}