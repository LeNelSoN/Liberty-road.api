const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths/:id", (req, res) => {
    Path.findByPk(req.params.id)
      .then((path) => {
        if (path === null || path.is_deleted) {
          const message = "Le Chemin n'existe pas";
          res.status(404).json(message)
        } else {
          const message = "Le Chemin a bien été trouvé !";
          res.json({ message, data: path });
        }
      })
      .catch(err => {
        const message = "Le Chemin n'a pas pu être trouvé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
