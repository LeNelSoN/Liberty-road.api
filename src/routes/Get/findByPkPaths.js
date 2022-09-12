const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths/:id", (req, res) => {
    Path.findByPk(req.params.id)
      .then((path) => {
        const message = "Le Chemin a bien été trouvé !";
        res.json({ message, data: path });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour trouver le chemin numéro ${req.params.id}: ${error} $`
        )
      );
  });
};
