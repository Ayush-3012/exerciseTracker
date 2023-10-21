import mongoose from "mongoose";

const userSchema = {
  username: {
    type: String,
    required: true,
    uniuqe: true,
    trim: true,
    minlength: 3,
  },
  // timestamps: true,
};

const User = mongoose.model("User", userSchema);

export default User;
