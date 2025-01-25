import { ApiResponse } from '../types/ApiResponse';
import bcrypt from 'bcrypt';

export const apiResponse = (
  statusCode: number,
  message: string,
  payload: unknown
): ApiResponse<any> => ({
  status: statusCode,
  message: message,
  payload: payload,
});

export const checkPassword = async (
  userPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashedPassword);
};
