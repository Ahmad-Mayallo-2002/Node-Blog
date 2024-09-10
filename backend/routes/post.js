const { Router } = require("express");
const { authenticationFunction } = require("../middlewares/middlewares");
const { config } = require("dotenv");
const { Post } = require("../models/post");
const multer = require("multer");
const { User } = require("../models/user");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

config();

const router = Router();

router.post(
  "/add-post",
  upload.single("file"),
  authenticationFunction,
  async (req, res) => {
    try {
      const { id } = req.headers;
      let requestBody;
      if (!req.body.content)
        return res.status(400).json({ msg: "Content is Required" });

      if (!req.file) {
        requestBody = {
          content: req.body.content,
        };
      } else {
        const file = req.file;
        const buffer = Buffer.from(file.buffer);
        requestBody = {
          content: req.body.content,
          file: buffer,
        };
      }
      const post = new Post({ user: id, ...requestBody });
      await post.save();
      await User.findByIdAndUpdate(id, {
        $push: { posts: post._id },
      });
      return res.status(200).json({ msg: "Post is Created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

// All Users
router.get("/get-post", authenticationFunction, async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "username image createdAt")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username image createdAt",
        },
      });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Delete All Posts
router.delete("/clear-post", authenticationFunction, async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length > 0) {
      await Post.deleteMany();
      await User.findByIdAndUpdate(req.headers.id, { $set: { posts: [] } });
      return res.status(200).json({ msg: "All Posts are Deleted" });
    } else {
      return res.status(200).json({ msg: "No Posts to Delete" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Delete a Particular Post
router.delete("/delete-post/:id", authenticationFunction, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Post.findByIdAndUpdate(req.params.id, { $set: { comments: [] } });
    await User.findByIdAndUpdate(req.headers.id, {
      $pull: { posts: req.params.id },
      $set: { comments: [] },
    });
    return res.status(200).json({ msg: "Post is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Update Post
router.patch(
  "/update-post/:id",
  upload.single("file"),
  authenticationFunction,
  async (req, res) => {
    try {
      let requestBody = {};
      if (req.body.content) requestBody.content = req.body.content;
      if (req.file) {
        requestBody.file = Buffer.from(req.file.buffer);
      } else {
        requestBody.file = null;
      }
      await Post.findByIdAndUpdate(req.params.id, { $set: requestBody });
      return res.status(200).json({ msg: "Post is Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

module.exports = {
  router,
};
