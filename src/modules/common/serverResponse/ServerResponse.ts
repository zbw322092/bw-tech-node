import { ICommonResponse } from "../interfaces/ICommonResponse";

export function createBySuccess(response: { code?: string, message?: string, data: any }): ICommonResponse<any> {
  return {
    code: response.code || '0000',
    message: response.message || 'success',
    data: response.data
  };
}

export function createByFail(response: { code: string, message?: string, data?: any }): ICommonResponse<any> {
  return {
    code: response.code,
    message: response.message || 'fail',
    data: response.data || {}
  };
}
