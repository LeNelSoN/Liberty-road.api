const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths", (req, res) => {
    Path.findAll()
      .then((paths) => {
        const message = "La Liste des Chemins a bien été récupérée.";
        res.json({ message, data: paths });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour trouver tout les chemins: ${error} $`
        )
      );
  });
};
