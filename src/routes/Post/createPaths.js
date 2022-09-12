const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/paths", (req, res) => {
    Path.create(req.body)
      .then((path) => {
        const message = `Le Chemin ${req.body.name} a bien été crée`;
        res.json({ message, data: path });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour créer le chemin ${req.body.name}: ${error} $`
        )
      );
  });
};
