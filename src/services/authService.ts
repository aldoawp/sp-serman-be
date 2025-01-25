import prisma from '../config/prismaConfig';
import { AuthDTO } from '../dtos/auth/authDTO';
import { ApiResponse } from '../types/ApiResponse';
import { apiResponse, checkPassword } from '../utils/helpers';
import jwt from 'jsonwebtoken';

export const checkCredentials = async (
  data: AuthDTO
): Promise<ApiResponse<AuthDTO | Error>> => {
  try {
    const isUserExist = await prisma.users.findUnique({
      select: {
        username: true,
        password: true,
      },
      where: {
        username: data.username,
      },
    });

    if (!isUserExist) {
      return apiResponse(404, 'User not found', { username: data.username });
    }

    const isPasswordCorrect = await checkPassword(
      data.password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return apiResponse(404, 'Wrong password', { username: data.username });
    }

    return apiResponse(200, 'User validated', { username: data.username });
  } catch (error) {
    console.error('Error on authentication: ', error);
    return apiResponse(500, 'Internal Server Error', error);
  }
};

export const createAccessToken = (
  data: AuthDTO
): ApiResponse<string | Error> => {
  const token = jwt.sign(data, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: process.env.JWT_ISSUER,
  });

  return apiResponse(200, 'JWT access token created', token);
};

export const createRefreshToken = (
  data: AuthDTO
): ApiResponse<string | Error> => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return apiResponse(200, 'JWT refresh token created', token);
};
