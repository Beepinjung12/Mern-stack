import express from "express";
import mongoose from "mongoose";

import {
  postRoom,
  getRooms,
  editRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

// CREATE ROOM
router.post("/", postRoom);

// GET ALL ROOMS
router.get("/", getRooms);

// UPDATE ROOM
router.put("/:id", editRoom);

// DELETE ROOM
router.delete("/:id", deleteRoom);

export default router;