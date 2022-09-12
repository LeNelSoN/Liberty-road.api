const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/hikkers", (req, res) => {
    Hikker.findAll()
      .then((hikker) => {
        const message = "La Liste des utilisateurs a bien été récupérée.";
        res.json({ message, data: hikker });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour trouver tout les utilisateur: ${error} $`
        )
      );
  });
};
