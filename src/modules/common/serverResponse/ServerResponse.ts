import { ICommonResponse } from "../interfaces/ICommonResponse";

interface ResponseJson {
  code?: string;
  message?: string;
  data?: any
}

export function createBySuccess(response: ResponseJson): ICommonResponse<any> {
  return {
    code: response.code || '0000',
    message: response.message || 'success',
    data: response.data
  };
}

export function createByFail(response: ResponseJson): ICommonResponse<any> {
  return {
    code: response.code,
    message: response.message || 'fail',
    data: response.data || {}
  };
}
