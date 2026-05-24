import Room from "../models/room.model.js";

// CREATE ROOM
export const postRoom = async (req, res) => {
  const room = req.body;

  // Validate required fields
  if (!room.title || !room.location) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const newRoom = new Room(room);

  try {
    await newRoom.save();

    res.status(201).json({
      success: true,
      data: newRoom,
    });
  } catch (error) {
    console.log("Error creating room:", error.message);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry not allowed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.log("Error fetching rooms:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// EDIT ROOM
export const editRoom = async (req, res) => {
  const { id } = req.params;
  const updatedRoom = req.body;

  try {
    const room = await Room.findByIdAndUpdate(id, updatedRoom, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log("Error updating room:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await Room.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting room:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};