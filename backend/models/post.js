const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, collection: "posts" }
);

const Post = model("Post", postSchema);

module.exports = { Post };
