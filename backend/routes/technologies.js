const { Router } = require("express");
const { authenticationFunction } = require("../middlewares/middlewares");
const { config } = require("dotenv");
const { Technology } = require("../models/technologies");
const multer = require("multer");

config();
const messageError = process.env.SERVER_ERROR_MESSAGE;
const router = Router();

const storage = multer.memoryStorage();

const update = multer({ storage: storage });

router.get("/get-technologies", async (req, res) => {
  try {
    const technologies = await Technology.find();
    return res.status(200).json(technologies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: messageError });
  }
});

router.post(
  "/add-technologies",
  update.single("icon"),
  authenticationFunction,
  async (req, res) => {
    try {
      const technology = new Technology({
        title: req.body.title,
        bio: req.body.bio,
        icon: req.body.icon || Buffer.from(req.file),
      });
      await technology.save();
      return res
        .status(200)
        .json({ msg: `${technology.title} Technology is Added` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: messageError });
    }
  }
);

router.delete(
  "/get-technologies/:id",
  authenticationFunction,
  async (req, res) => {
    try {
      const technologies = await Technology.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ msg: `${technologies.title} Technology is Deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: messageError });
    }
  }
);

module.exports = {
  router,
};
