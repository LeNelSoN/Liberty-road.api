const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/hikkers/:id", (req, res) => {
    Hikker.findByPk(req.params.id)
      .then((hikker) => {
        const message = "L'utilisateur a bien été trouvé !";
        res.json({ message, data: hikker });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour trouver l'utilisateur ${req.params.id}: ${error} $`
        )
      );
  });
};
