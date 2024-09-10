const { Router } = require("express");
const { authenticationFunction } = require("../middlewares/middlewares");
const { config } = require("dotenv");
const multer = require("multer");
const { Project } = require("../models/projects");

const router = Router();
const ErrorMessage = process.env.SERVER_ERROR_MESSAGE;

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
upload.single("image");
router.post(
  "/add-project",
  upload.single("image"),
  authenticationFunction,
  async (req, res) => {
    try {
      const checkProject = await Project.findOne({ link: req.body.link });
      if (checkProject) {
        return res
          .status(400)
          .json({ msg: "This Project is Already Existing" });
      }
      const project = new Project({
        title: req.body.title,
        link: req.body.link,
        bio: req.body.bio,
        image: req.file ? Buffer.from(req.file.buffer) : req.body.image,
      });
      await project.save();
      return res.status(200).json({ msg: "New Project is Added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

router.get("/get-project", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: ErrorMessage });
  }
});

router.delete(
  "/delete-project/:id",
  authenticationFunction,
  async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "One Project is Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

router.patch(
  "/update-project/:id",
  upload.single("image"),
  authenticationFunction,
  async (req, res) => {
    try {
      let requestBody = {};
      if (req.body.title) requestBody = { title: req.body.title };
      if (req.body.link) requestBody = { link: req.body.link };
      if (req.body.bio) requestBody = { bio: req.body.bio };
      if (req.file) {
        requestBody = {
          image: Buffer.from(req.file.buffer.buffer),
        };
      }

      if (Object.keys(requestBody).length === 0) {
        return res
          .status(400)
          .json({ msg: "You Must Update Minimum One Field" });
      }
      await Project.findByIdAndUpdate(req.params.id, {
        $set: requestBody,
      });

      return res.status(200).json({ msg: "The Project is Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

module.exports = {
  router,
};
