import express from "express";
import { postRoom, getRooms } from "../controllers/room.controller.js"; // Added getRooms here

const router = express.Router();

// POST route to create a room
router.post("/", postRoom);

// GET route to show all listed rooms
router.get("/", getRooms);

export default router;