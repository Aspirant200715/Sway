import express from "express";
import {
  registerUser,
  LoginUser,
  getUser,
  logoutUser,
  getUserProfile,
  followUser,
  unfollowUser,
  testUpload,
} from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/authmiddleware.js";
import upload from "../middlewares/upload.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", LoginUser);
userRoutes.get("/me", isAuthenticated, getUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/profile/:username", isAuthenticated, getUserProfile);
userRoutes.post('/:id/follow',isAuthenticated,followUser)
userRoutes.post('/:id/unfollow',isAuthenticated,unfollowUser)
userRoutes.post('/testUpload',isAuthenticated,upload.single('profile_Image'),testUpload)

export default userRoutes;
