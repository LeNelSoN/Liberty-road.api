const { Friend } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    Friend.findAll()
      .then((friends) => {
        const message = "La Liste amitiées a bien été récupérée.";
        friends = friends.filter(friend => friend.is_deleted !== true)
        res.json({ message, data: friends });
      })
  });
};
