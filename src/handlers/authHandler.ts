import { Request, Response } from 'express';
import { authSchema } from '../utils/validations/authValidation';
import {
  checkCredentials,
  createAccessToken,
  // createRefreshToken,
} from '../services/authService';

// Check credentials username and password if it exist on the database
// If it exist, then create a JWT
// Then the JWT is send through HttpOnly cookies
// How to handle JWT token refresh?

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const validatedRequest = authSchema.parse(req.body);

    const checkUser = await checkCredentials(validatedRequest);

    if (checkUser.status == 404) {
      res.status(checkUser.status).json({
        message: checkUser.message,
        payload: checkUser.payload,
      });
      return;
    }

    const accessToken = createAccessToken(validatedRequest);

    res
      .cookie('access-token', accessToken.payload, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      })
      .status(accessToken.status)
      .json({
        message: `${accessToken.message}. ${checkUser.message}`,
        payload: checkUser.payload,
      });
    return;
  } catch (error) {
    console.error('Login error: ', error);
    res.status(400).json({
      message: 'On login error',
      payload: error,
    });
    return;
  }
};

// export const handleLogout = (req: Request, res: Response) => {};

// export const handleForgotPassword = (req: Request, res: Response) => {};

// export const handleRememberPassword = (req: Request, res: Response) => {};
