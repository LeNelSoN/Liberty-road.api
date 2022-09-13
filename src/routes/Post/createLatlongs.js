const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/latlongs", (req, res) => {
    LatLong.create(req.body)
      .then((latlong) => {
        const message = `Le Chemin ${req.body.name} a bien été crée`;
        res.json({ message, data: latlong });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour créer la coordonées ${req.body.name}: ${error} $`
        )
      );
  });
};
