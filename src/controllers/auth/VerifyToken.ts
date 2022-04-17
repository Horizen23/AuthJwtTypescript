import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { refreshTokens, users } from '../../database';
import { REFRESH_TOKEN } from '../../config/token';

export default async function VerifyToken(req:Request, res:Response){
  const refreshToken:string = req.header("x-auth-token") as string;
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }


  try {
    const user:any = await JWT.verify(
      refreshToken,
      REFRESH_TOKEN
    );
    // user = { email: 'com100pb@gmail.com', iat: 1633586290, exp: 1633586350 }
    res.json(user);
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }


};
