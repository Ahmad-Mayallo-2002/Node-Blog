const { model, Schema, Types } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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
    confirmPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { collection: "users", timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
  User,
};
