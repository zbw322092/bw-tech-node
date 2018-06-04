import { ICommonResponse } from '../interfaces/ICommonResponse';
import { COMMONSERVERERROR, LOGINREQUIRED } from './Const.Error';

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

/**
 * Common server error response
 */
export function createByServerError(): ICommonResponse<{}> {
  return createByFail({ code: COMMONSERVERERROR, message: 'server error' });
}

/**
 * Common login required response
 */
export function createByLoginRequired(): ICommonResponse<{}> {
  return createByFail({ code: LOGINREQUIRED, message: 'login required' });
}