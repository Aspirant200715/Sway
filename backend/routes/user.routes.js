import express from "express"
import { registerUser,LoginUser,getUser, logoutUser } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/authmiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register",registerUser)
userRoutes.post("/login",LoginUser)
userRoutes.get("/me",isAuthenticated,getUser)
userRoutes.post("/logout",logoutUser)


export default userRoutes;