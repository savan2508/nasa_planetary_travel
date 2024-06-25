const http = require("http");
const app = require("./app");
const { loadPlanetsDate } = require("./models/planets.models");
require("dotenv").config();
const { mongoConnect } = require("./services/mongo");
const { loadLaunchesData } = require("./models/launches.models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadLaunchesData();
  await loadPlanetsDate();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

startServer();
