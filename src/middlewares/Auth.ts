import { ACCESS_TOKEN } from '../config/token';

import express from 'express'; 
import JWT from 'jsonwebtoken';
export default  function Auth (req: express.Request,res: express.Response,next:express.NextFunction){
        const token = req.body.token || req.headers['x-access-token'] || req.headers['x-auth-token']
        if(!token){
            return res.status(400).send('token not found')
        }
        try{
            const user =  JWT.verify(
                token,
                ACCESS_TOKEN
            )
            console.log(user)
            next()
        }catch(error:any){
            switch(error.constructor){
                case JWT.TokenExpiredError:
                    return res.status(401).send('token expired')
                default:
                    return res.status(403).send('invalid signature')
            }
        }
}