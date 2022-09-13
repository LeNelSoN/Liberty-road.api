const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths", (req, res) => {
    Path.findAll()
      .then((paths) => {
        const message = "La Liste des Chemins a bien été récupérée.";
        paths = paths.filter(path => path.is_deleted !== true)
        res.json({ message, data: paths });
      })
    });
};
