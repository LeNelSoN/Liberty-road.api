const { Friend } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/paths", (req, res) => {
    Friend.create(req.body)
      .then((friend) => {
        const message = `Le Chemin ${req.body.name} a bien été crée`;
        res.json({ message, data: friend });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour créer la relation ${req.body.name}: ${error} $`
        )
      );
  });
};
