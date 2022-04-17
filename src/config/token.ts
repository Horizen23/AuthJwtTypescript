import dotenv from 'dotenv';
import { Secret} from 'jsonwebtoken';
dotenv.config()

export const ACCESS_TOKEN:Secret =  process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN:Secret =  process.env.REFRESH_TOKEN_SECRET as string;
export const EXPIRATION:number =  parseInt(process.env.EXPIRATION as string) ;
export const REFRESHEXPIRATION:number =  parseInt(process.env.REFRESHEXPIRATION as string) ;
export const PORT:string =  process.env.PORT as string;
