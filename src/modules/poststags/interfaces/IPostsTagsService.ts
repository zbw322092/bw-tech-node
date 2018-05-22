import { AddPostTagDto } from "./poststags.dto";
import { ICommonResponse } from "../../common/interfaces/ICommonResponse";

export interface IPostsTagsService {
  addPostTag(session: any, addPostTagDto: AddPostTagDto): Promise<ICommonResponse<{}>>
}