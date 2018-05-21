import { AddPermissionDto } from "./permission.dto";
import { ICommonResponse } from "../../common/interfaces/ICommonResponse";

export interface IPermissionService {
  addPermission(session: any, addPermissionDto: AddPermissionDto): Promise<ICommonResponse<{}>>
}