const http = require("http");
const app = require("./app");
const { loadPlanetsDate } = require("./models/planets.models");
require("dotenv").config();
const mongoose = require("mongoose");

const mongoDBUser = process.env.MONGO_DB_USERNAME;
const mongoDBPassword = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://nasa-api:${mongoDBPassword}@nasacluster.b7jkqi7.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(uri);
  await loadPlanetsDate();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

startServer();
