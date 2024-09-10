const { model, Schema } = require("mongoose");

const ProjectsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Buffer || String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "projects" }
);

const Project = model("Project", ProjectsSchema);

module.exports = {
  Project,
};
