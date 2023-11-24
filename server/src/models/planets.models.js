const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const results = [];
const habitablePlanet = [];

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
      .on("data", (data) => {
        results.push(data);
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          `${habitablePlanet.length} habitable planets found from the total ${results.length} planets discovered by Kepler!`,
        );
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanet;
}

module.exports = {
  loadPlanetsDate,
  getAllPlanets,
};
