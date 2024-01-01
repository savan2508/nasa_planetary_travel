const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const Planets = require("./planets.mongo");

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsDate() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv"),
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        }),
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(
          `${countPlanetsFound} habitable planets found from the total planets discovered by Kepler!`,
        );
        resolve();
      });
  });
}

async function getAllPlanets() {
  try {
    return await Planets.find();
  } catch (error) {
    console.error(`Error fetching planets: ${error}`);
    throw error; // Propagate the error to the caller if needed
  }
}

async function savePlanet(planet) {
  try {
    await Planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      },
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsDate,
  getAllPlanets,
};
