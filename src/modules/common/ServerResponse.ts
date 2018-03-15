import { CommonResponse } from "./Interfaces/response";

export namespace ServerResponse {

  enum ResponseCode {
    'SUCCESS' = '0000',
    'NOT_LOGIN' = '0001',
    'ERROR' = 'error.0001'
  }

  enum ResponseMsg {
    'SUCCESS' = 'success',
    'NOT_LOGIN' = 'have not login, please login',
    'ERROR' = 'something wrong'
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

  export function createByErrorData(data: any): CommonResponse {
    return { 
      code: ResponseCode.ERROR,
      message: ResponseMsg.ERROR,
      data
    };
  }

  export function createByErrorCodeData(code: string, data: any): CommonResponse {
    return { 
      code,
      message: ResponseMsg.ERROR,
      data
    };
  }

  export function createByErrorCodeMsgData(code: string, message: string, data: any): CommonResponse {
    return { code, message, data };
  }
}