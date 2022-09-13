const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/latlongs", (req, res) => {
    LatLong.create(req.body)
      .then((latlong) => {
        const message = `La coordonnée ${req.body.name} a bien été crée`;
        res.json({ message, data: latlong });
      })
      .catch(err => {
        const message = "La coordonnée n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
