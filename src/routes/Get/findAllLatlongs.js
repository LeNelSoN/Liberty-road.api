const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/latlongs", (req, res) => {
    LatLong.findAll()
      .then((latlongs) => {
        const message = "La Liste des coordonnées a bien été récupérée.";
        latlongs = latlongs.filter(latlong => latlong.is_deleted !== true)
        res.json({ message, data: latlongs });
      })
  });
};
