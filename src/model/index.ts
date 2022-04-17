import mongoose  from 'mongoose';
mongoose.Promise = global.Promise;
import user_model from './user'
import role_model from './role'
import refreshToken_model from './refreshToken'
 const db:{
    mongoose:any,
    User:any,
    Role:any,
    RefreshToken:any,
    ROLES:any
} = {
    mongoose:mongoose,
    User:user_model,
    Role:role_model,
    RefreshToken:refreshToken_model,
    ROLES:["user", "admin", "moderator"]
};

export default db

