import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { refreshTokens, users } from '../../database';


export default async function Logout(req:Request, res:Response){
  const refreshToken:string = req.header("x-auth-token") as string;
  (refreshTokens as any) = refreshTokens.filter((token:string) => token !== refreshToken);  
  res.json({
    refreshTokens
});
};
