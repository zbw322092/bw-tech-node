import { AddPermissionRoleDto } from "./permissionrole.dto";
import { ICommonResponse } from "../../common/interfaces/ICommonResponse";

export interface IPermissionRoleService {
  addPermissionRole (session: any, addPermissionRoleDto: AddPermissionRoleDto): Promise<ICommonResponse<{}>>;
}