import { Router } from "express";
import Login from "../controllers/auth/Login";
import Logout from "../controllers/auth/Logout";
import Signup from "../controllers/auth/Signup";
import Token from '../controllers/auth/Token';
import VerifyToken from "../controllers/auth/VerifyToken";
import Dashboad from "../controllers/dashboad";
import Auth from "../middlewares/Auth";
const routes = Router();


routes.post('/login', Login)
routes.post('/signup', Signup)
routes.post('/logout', Logout)
routes.post('/token', Token)
routes.post('/verify/token', VerifyToken)

// auth router 
routes.use([Auth])
routes.post('/test',Dashboad)
routes.post('/dashboad',Dashboad)


export default routes;