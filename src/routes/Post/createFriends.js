const { Friend } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/paths", (req, res) => {
    Friend.create(req.body)
      .then((friend) => {
        const message = `L'amitiée ${req.body.name} a bien été créé`;
        res.json({ message, data: friend });
      })
      .catch(err => {
        const message = "L'amitiée n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
