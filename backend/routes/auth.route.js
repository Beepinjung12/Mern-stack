import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
} from "../controllers/auth.controller.js";
import { get } from "mongoose";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", protectRoute, getUserProfile);
router.put("/profile/update", protectRoute, updateUserProfile);
router.post("/logout", protectRoute, logoutUser);

export default router;
