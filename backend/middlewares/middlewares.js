const { verify } = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const authenticationFunction = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token is Expired Please Sign In Again" });
  }

  verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) {
      return res.status(403).json(error);
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticationFunction,
};
