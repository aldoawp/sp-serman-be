import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'] || null;

  if (!accessToken) {
    res.status(401).json({
      message: "You're unauthorized. Please login.",
    });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET!,
    { issuer: process.env.JWT_ISSUER },
    (err: any, decoded: any) => {
      if (err) {
        res.status(400).json({ message: 'Invalid Token', payload: err });
        return;
      }
      req.body.user = decoded;
      next();
    }
  );
};

export default validateAuth;
