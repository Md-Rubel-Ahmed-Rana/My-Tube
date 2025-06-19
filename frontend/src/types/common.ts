export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};
