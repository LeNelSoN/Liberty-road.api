const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths/:id", (req, res) => {
    Path.findByPk(req.params.id)
      .then((path) => {
        const message = "Le Chemin a bien été trouvé !";
        path.is_deleted ? res.json('Le Chemin a été supprimé') : res.json({ message, data: path });
      })
  });
};
