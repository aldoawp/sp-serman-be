import { ApiResponse } from '../types/ApiResponse';

export const apiResponse = (
  statusCode: number,
  message: string,
  payload: unknown
): ApiResponse<any> => ({
  status: statusCode,
  message: message,
  payload: payload,
});
