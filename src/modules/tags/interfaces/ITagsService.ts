import { AddTagDto } from "./tags.dto";
import { ICommonResponse } from "../../common/interfaces/ICommonResponse";

export interface ITagsService {
  addTag (session: any, addTagDto: AddTagDto): Promise<ICommonResponse<{}>>
}