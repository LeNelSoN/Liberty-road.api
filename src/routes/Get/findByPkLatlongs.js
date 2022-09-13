const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/latlongs/:id", (req, res) => {
    LatLong.findByPk(req.params.id)
      .then((latlong) => {
        const message = "L'utilisateur a bien été trouvé !";
        latlong.is_deleted ? res.json("L'utilisateur a été supprimé") : res.json({ message, data: hikker });
      })
  });
};
