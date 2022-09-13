const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.patch("/api/paths/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Path.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        Path.findByPk(id).then((path) => {
          const message = `Le Chemin ${path.name} a bien été supprimé !`;
          res.json({ message, data: path });
        });
      })
  });
};