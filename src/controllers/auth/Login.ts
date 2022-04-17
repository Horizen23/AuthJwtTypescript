import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { refreshTokens, users } from '../../database';
import { ACCESS_TOKEN, EXPIRATION, REFRESH_TOKEN } from '../../config/token';
import DB from '../../model'

export default async function Login(req:Request, res:Response){
  const user = await DB.User.findOne({email: req.body.email}).populate("roles", "-__v").exec()
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  let passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }


  let token = JWT.sign({ id: user.id }, ACCESS_TOKEN, {
    expiresIn: EXPIRATION,
  });


  let refreshToken = await DB.RefreshToken.createToken(user);

  let authorities = [];

  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token,
    refreshToken: refreshToken,
  });
};
async function Lodgin(req:Request, res:Response){
    const { email, password } = req.body;
    let user = users.find((user) => {
        return user.email === email;
   });
   if (!user) {
        return res.status(400).json({
            errors: [
                {
                msg: "Invalid credentials",
                },
            ],
        });
    }
    let isMatch = password == user.password;
    if (!isMatch) {
        return res.status(401).json({
          errors: [
            {
              msg: "Email or password is invalid",
            },
          ],
        });
    }
    const accessToken = await JWT.sign(
        { email },
        ACCESS_TOKEN,
        {
          expiresIn: "1m",
        }
    );
    const refreshToken = await JWT.sign(
        { email },
        REFRESH_TOKEN,
        {
          expiresIn: "1h",
        }
    );
    refreshTokens.push(refreshToken);
    res.json({
        accessToken,
        refreshToken,
        refreshTokens

    });
};
