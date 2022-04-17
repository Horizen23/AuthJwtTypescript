import { Request, Response } from 'express';
import DB from '../../model'
import bcrypt from 'bcryptjs';


export default async function Signup(req: Request, res: Response) {
  const { email, password, username } = req.body;
  try {
    const cuser = await DB.User.findOne({ email: req.body.email })
    if(cuser) {
      return res.status(500).send({ message: "Duplicate this email" })
    };
    let role = await DB.Role.findOne({ name: "user" })
    const user = new DB.User({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      roles:[role._id]
    });
    await user.save();
    res.send({ message: "User was registered successfully!" });

  } catch(err:any) {

   return  res.status(500).send({ message: err })

  }

};
