const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/profiles", (req, res) => {
    Profile.create(req.body)
      .then((profile) => {
        const message = `Le profile ${req.body.name} a bien été crée`;
        res.json({ message, data: profile });
      })
      .catch(err => {
        const message = "Le profile n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
