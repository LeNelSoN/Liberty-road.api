const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/profiles", (req, res) => {
    Profile.findAll()
      .then((profiles) => {
        const message = "La Liste des profils a bien été récupérée.";
        profiles = profiles.filter(profile => profile.is_deleted !== true)
        res.json({ message, data: profiles });
      })
  });
};
