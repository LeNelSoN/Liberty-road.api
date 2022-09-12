const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/hikkers", (req, res) => {
    Hikker.create(req.body)
      .then((hikker) => {
        const message = `L'utilisateur ${req.body.username} a bien été crée`;
        res.json({ message, data: hikker });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour créer l'utilisateur' ${req.body.username}: ${error} $`
        )
      );
  });
};
