const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBUser = process.env.MONGO_DB_USERNAME;
const mongoDBPassword = process.env.MONGO_DB_PASSWORD;

const uri =
  process.env.MONGO_URL ||
  `mongodb+srv://nasa-api:${mongoDBPassword}@nasacluster.b7jkqi7.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
  // Throw an error to propagate it to the calling code
  throw new Error("MongoDB connection error");
});

async function mongoConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate the error
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error; // Propagate the error
  }
}

module.exports = { mongoConnect, mongoDisconnect };
