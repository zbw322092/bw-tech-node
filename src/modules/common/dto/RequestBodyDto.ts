export class RequestBodyDto<T> {
  public protocol: { functionCode: string };
  public param: T;
}