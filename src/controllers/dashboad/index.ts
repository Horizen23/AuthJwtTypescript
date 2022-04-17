import { refreshTokens } from './../../database';

import {Response ,Request} from 'express'
import DB from '../../model'

export default async function Dashboad (req:Request,res:Response){
      const reftokens = await DB.RefreshToken.find()

    return res.status(200).json(reftokens)
}