const { Router } = require("express");
const { User } = require("../models/user.js");
const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { authenticationFunction } = require("../middlewares/middlewares.js");
const { config } = require("dotenv");
const multer = require("multer");
const path = require("path");

config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../frontend/public"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

// Sign Up
router.post("/sign-up", upload.single("image"), async (req, res) => {
  try {
    const { username, email, password, confirmPassword, image } = req.body;
    const existingUser = await User.find({ email: email });
    const hashPassword = await hash(password, 10);
    const hashConfirmPassword = await hash(confirmPassword, 10);
    let requestBody = {
      username: username,
      email: email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
    };
    if (existingUser.length !== 0) {
      return res.status(400).json({ msg: "This Email is Already Existing" });
    }
    if (req.file) {
      requestBody = { ...requestBody, image: req.file.filename };
    }
    const user = new User(requestBody);
    await user.save();
    return res.status(200).json({ msg: "Sign Up is Complete" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).json({ msg: "Invalid Email or Password" });
    }

    compare(password, checkUser.confirmPassword, async (error, data) => {
      if (error) {
        return res.status(500).json({ msg: "Error comparing passwords" });
      }

      if (data) {
        const payload = [{ username: checkUser.email }];
        const token = sign({ payload }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).json({ id: checkUser._id, token: token });
      } else {
        return res.status(404).json({ msg: "Invalid Email or Password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// All Users
router.get("/users", authenticationFunction, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Delete User
router.delete("/delete-user", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Delete This User is Complete" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Single User
router.get("/single-user", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const users = await User.findById(id)
      .populate(["posts", "comments"])
      .select("-password")
      .select("-confirmPassword");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Update User Data
router.patch(
  "/update-user",
  upload.single("image"),
  authenticationFunction,
  async (req, res) => {
    try {
      let requestBody = {};
      const { id } = req.headers;
      const { username, email, password, confirmPassword, image, role } =
        req.body;
      const hashPassword = await hash(password, 10);
      const hashConfirmPassword = await hash(confirmPassword, 10);
      if (username) requestBody = { username: username };
      if (email) requestBody = { email: email };
      if (password)
        requestBody = {
          password: hashPassword,
          confirmPassword: hashConfirmPassword,
        };
      if (req.file) requestBody = { image: req.file.filename };
      if (role) requestBody = { role: role };
      const user = await User.findByIdAndUpdate(id, {
        $set: req.body,
      });
      await user.save();
      res.status(200).json({ msg: "Update Data is Complete" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

module.exports = {
  router,
};
