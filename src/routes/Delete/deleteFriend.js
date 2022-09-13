const { Friend } = require("../../db/sequelize");

module.exports = (app) => {
  app.patch("/api/friends/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Friend.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        Friend.findByPk(id).then((path) => {
          const message = `Le lien d'amitié a bien été supprimé !`;
          res.json({ message, data: path });
        });
      })
  });
};