const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/hikkers", (req, res) => {
    Hikker.findAll()
      .then((hikkers) => {
        const message = "La Liste des utilisateurs a bien été récupérée.";
        hikkers = hikkers.filter(hikker => hikker.is_deleted !== true)
        res.json({ message, data: hikkers });
      })
  });
};
