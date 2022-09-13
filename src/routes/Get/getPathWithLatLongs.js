const { LatLong } = require("../../db/sequelize");
const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths/:id/latlong", (req, res) => {
    Path.findByPk(req.params.id)
      .then((path) => {
        LatLong.findAll({where:{
            pathId: req.params.id
        }}).then(latlongs => {
            const message = "Le chemin a bien été trouvé !";
            path.is_deleted ? res.json("Le chemin a été supprimé") : res.json({ message, data: path, latlongs });
          })
      })

  });
};
