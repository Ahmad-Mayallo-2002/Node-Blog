const { Schema, model } = require("mongoose");

const TechnologiesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "technologies" }
);

const Technology = model("Technology", TechnologiesSchema);

module.exports = {
  Technology,
};
