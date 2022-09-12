const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/hikkers/:id", (req, res) => {
    const id = req.params.id;
    Hikker.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        Hikker.findByPk(id).then((hikker) => {
          const message = `Le Chemin ${hikker.username} a bien été modifié !`;
          res.json({ message, data: hikker });
        });
      })
  });
};
