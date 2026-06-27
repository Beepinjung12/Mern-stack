// entry point for hamro api
import express from "express";
import Room from "./models/room.model.js";

import { connectDB } from "./config/db.js";
import roomRoutes from "./routes/room.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); // intialize

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // ← your exact frontend URL
    credentials: true, // ← allow cookies
  }),
);
app.use(cookieParser());

app.use("/api/rooms", roomRoutes); // routes bolauxa routes le controller ani controller le model
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("basobasproject server started at http://localhost:5000"); // nodemon halesi
});
