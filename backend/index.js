const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("./db.js");
const { config } = require("dotenv");
const { router: userRouter } = require("./routes/user.js");
const { router: postRouter } = require("./routes/post.js");
const { router: technologiesRouter } = require("./routes/technologies.js");
const { router: projectsRouter } = require("./routes/projects.js");
const { router: commentsRouter } = require("./routes/comment.js");
config();

const port = process.env.PORT || 8080;
const api = "/api";

// Init Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded(true));

app.use(
  cors({
    origin: ["https://nodeblog-ui.vercel.app/"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use(api, userRouter);
app.use(api, postRouter);
app.use(api, technologiesRouter);
app.use(api, projectsRouter);
app.use(api, commentsRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

// Server
app.listen(port, () =>
  console.log(`Server is Runing on ${port} Port http://localhost:${port}`)
);
