const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.patch("/api/hikkers/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Hikker.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        Hikker.findByPk(id).then((hikker) => {
          const message = `L'utilisateur' ${hikker.username} a bien été supprimé !`;
          res.json({ message, data: hikker });
        });
      })
  });
};