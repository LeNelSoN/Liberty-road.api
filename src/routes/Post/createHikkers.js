const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/hikkers", (req, res) => {
    Hikker.create(req.body)
      .then((hikker) => {
        const message = `L'utilisateur ${req.body.username} a bien été crée`;
        res.json({ message, data: hikker });
      })
      .catch(err => {
        const message = "L'utilisateur n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
