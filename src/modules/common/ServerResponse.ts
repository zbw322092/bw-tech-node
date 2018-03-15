import { CommonResponse } from "./Interfaces/response";

export namespace ServerResponse {

  enum ResponseCode {
    'SUCCESS' = '0000',
    'NOT_LOGIN' = '0001'
  }

  enum ResponseMsg {
    'SUCCESS' = 'success',
    'NOT_LOGIN' = 'have not login, please login'
  }

  export function createBySuccessData(data: any): CommonResponse {
    return {
      code: ResponseCode.SUCCESS,
      message: ResponseMsg.SUCCESS,
      data
    };
  }

  export function createBySuccessMsgData(message: string, data: any): CommonResponse {
    return {
      code: ResponseCode.SUCCESS,
      message, data
    };
  }

  export function createBySuccessCodeMsgData(code: string, message: string, data: any): CommonResponse {
    return { code, message, data };
  }
}