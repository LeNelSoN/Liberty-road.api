const { Friend } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/friends/:id", (req, res) => {
    Friend.findByPk(req.params.id)
      .then((friend) => {
        const message = "Le lien a bien été trouvé !";
        friend.is_deleted ? res.json("L'utilisateur a été supprimé") : res.json({ message, data: hikker });
      })
  });
};
