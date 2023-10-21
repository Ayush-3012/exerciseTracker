import mongoose from "mongoose";

const exerciseSchema = {
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // timeStamps: true,
};

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
