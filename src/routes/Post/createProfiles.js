const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.post("/api/profiles", (req, res) => {
    Profile.create(req.body)
      .then((profile) => {
        const message = `Le Chemin ${req.body.name} a bien été crée`;
        res.json({ message, data: profile });
      })
      .catch((error) =>
        console.error(
          `Il y'a une erreur pour créer le profile${req.body.name}: ${error} $`
        )
      );
  });
};
