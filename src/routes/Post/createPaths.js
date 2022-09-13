const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/paths", (req, res) => {
    Path.create(req.body)
      .then((path) => {
        const message = `Le Chemin ${req.body.name} a bien été crée`;
        res.json({ message, data: path });
      })
      .catch(err => {
        const message = "Le Chemin n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
