import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { refreshTokens, users } from '../../database';
import { ACCESS_TOKEN, EXPIRATION, REFRESH_TOKEN } from '../../config/token';
import DB from '../../model'

export default async function Logout(req:Request, res:Response){
  const refToken:string = req.header("x-auth-refresh-token") as string;
  if (refToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await DB.RefreshToken.findOne({ token: refToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (DB.RefreshToken.verifyExpiration(refreshToken)) {
      DB.RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = JWT.sign({ id: refreshToken.user._id }, ACCESS_TOKEN, {
      expiresIn: EXPIRATION,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }

};

// export default async function Logout(req:Request, res:Response){
//   const refreshToken:string = req.header("x-auth-refresh-token") as string;
//   if (!refreshToken) {
//     res.status(401).json({
//       errors: [
//         {
//           msg: "Token not found",
//         },
//       ],
//     });
//   }
//   if (!refreshTokens.includes(refreshToken)) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid refresh token",
//         },
//       ],
//     });
//   }


//   try {
//     const user:any = await JWT.verify(
//       refreshToken,
//       REFRESH_TOKEN
//     );
//     // user = { email: 'com100pb@gmail.com', iat: 1633586290, exp: 1633586350 }
//     const { email } = user;
//     const accessToken = await JWT.sign(
//       { email },
//       ACCESS_TOKEN,
//       { expiresIn: "1m" }
//     );
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid token",
//         },
//       ],
//     });
//   }


// };
