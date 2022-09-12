const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/paths/:id", (req, res) => {
    const id = req.params.id;
    Path.update(req.body, {
      where: { id: id },
    })
      .then(_ => {
        Path.findByPk(id).then((path) => {
          const message = `Le Chemin ${path.name} a bien été modifié !`;
          res.json({ message, data: path });
        });
      })
  });
};
