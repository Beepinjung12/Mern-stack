import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // photo: {
    //   type: String,
    //   required: true,
    // },

    roomSize: {
      type: String,
    },

    numberOfRooms: {
      type: Number,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // postedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);
roomSchema.index({ title: 1 }, { unique: true }); // Unique index on title
const Room = mongoose.model("Room", roomSchema);

export default Room;
