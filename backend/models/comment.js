const { model, Schema, Types } = require("mongoose");

const CommentSchema = new Schema(
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
  },
  { collection: "comments", timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = {
  Comment,
};
