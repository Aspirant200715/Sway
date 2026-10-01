import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }
    /// ids to be stored
  ],
  followings: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }
    /// ids to be stored
  ],
  posts: [
    // ids to be stored
  ],
  stories: [
    //ids to be stored
  ],
  reels: [
    //ids to be stored
  ],
  profile_Image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
