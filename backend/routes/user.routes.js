import express from "express"
import { registerUser,LoginUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

//Register User 
userRoutes.post("/register",registerUser)
userRoutes.post("/login",LoginUser)
//Login User 


export default userRoutes;