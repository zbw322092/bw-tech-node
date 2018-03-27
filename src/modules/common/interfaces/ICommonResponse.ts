export interface ICommonResponse<T> {
  code: string;
  message: string;
  data: T;
}