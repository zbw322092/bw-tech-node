import { AddRolesUsersDto } from "./rolesusers.dto";
import { ICommonResponse } from "../../common/interfaces/ICommonResponse";

export interface IRolesUsersService {
  addRolesUsers(session: any, addRolesUsersDto: AddRolesUsersDto): Promise<ICommonResponse<any>>;
}