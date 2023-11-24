const { getAllPlanets } = require("../../models/planets.models");

function httpGetAllPlanets(req, res) {
  res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
