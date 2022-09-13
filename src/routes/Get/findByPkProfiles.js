const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/profiles/:id", (req, res) => {
    Profile.findByPk(req.params.id)
      .then((profile) => {
        const message = "Le Profil a bien été trouvé !";
        profile.is_deleted ? res.json('Le Profil a été supprimé') : res.json({ message, data: path });
      })
  });
};
