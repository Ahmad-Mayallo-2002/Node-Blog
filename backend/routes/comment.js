const { config } = require("dotenv");
const { authenticationFunction } = require("../middlewares/middlewares");
const { Router } = require("express");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const multer = require("multer");
config();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const router = Router();

const ErrorMessage = process.env.SERVER_ERROR_MESSAGE;

router.get("/get-comment", authenticationFunction, async (req, res) => {
  try {
    const comments = await Comment.find({}).populate(
      "user",
      "username image createdAt"
    );
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: ErrorMessage });
  }
});

router.get("/get-comment/:id", authenticationFunction, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "user",
      "username email"
    );
    return res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ msg: ErrorMessage });
  }
});

router.post(
  "/add-comment/:postId",
  upload.single("file"),
  authenticationFunction,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const { content } = req.body;
      let requestBody = {};
      if (content) {
        requestBody = { content: content };
      } else {
        return res.status(400).json({ msg: "Write Comment Please" });
      }
      if (req.file) {
        requestBody = { file: Buffer.from(req.file.buffer) };
      }
      const comment = new Comment({ user: id, ...requestBody });
      await User.findByIdAndUpdate(id, { $push: { comments: comment._id } });
      await Post.findByIdAndUpdate(req.params.postId, {
        $push: { comments: comment._id },
      });
      await comment.save();
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

router.patch(
  "/update-comment/:id",
  upload.single("file"),
  authenticationFunction,
  async (req, res) => {
    try {
      const { content } = req.body;
      let requestBody = {
        content: content,
      };
      if (!content) {
        return res.status(400).json({ msg: "Write Comment Please" });
      }
      if (req.file) {
        requestBody = {
          ...requestBody,
          file: Buffer.from(req.file.buffer),
        };
      }
      await Comment.findByIdAndUpdate(req.params.id, { $set: requestBody });
      return res.status(200).json({ msg: "Comment is Updated" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

router.delete(
  "/delete-comment/:id",
  authenticationFunction,
  async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      await User.findByIdAndUpdate(req.headers.id, {
        $pull: { comments: req.params.id },
      });
      return res.status(200).json({ msg: "Comment is Deleted" });
    } catch (error) {
      res.status(500).json({ msg: ErrorMessage });
    }
  }
);

module.exports = {
  router,
};
