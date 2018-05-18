import { ICommonResponse } from "../interfaces/ICommonResponse";

/**
 * - `code` - response code.
 * - `message` - response message
 * - `data` - Required. response data
 * @param response 
 */
export function createBySuccess(response: { code?: string, message?: string, data: any }): ICommonResponse<any> {
  return {
    code: response.code || '0000',
    message: response.message || 'success',
    data: response.data
  };
}

/**
 * - `code` - Required. response code.
 * - `message` - response message
 * - `data` - response data
 * @param response
 */
export function createByFail(response: { code: string, message?: string, data?: any }): ICommonResponse<any> {
  return {
    code: response.code,
    message: response.message || 'fail',
    data: response.data || {}
  };
}
