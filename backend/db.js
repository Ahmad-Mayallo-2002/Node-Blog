const { config } = require("dotenv");
const { connect } = require("mongoose");
config();

const databaseConnection = async () => {
  try {
    connect(process.env.DATABASE_URL);
    console.log("Database Connection is Done");
  } catch (error) {
    console.log("Database Connection is Failure");
  }
};

databaseConnection();
