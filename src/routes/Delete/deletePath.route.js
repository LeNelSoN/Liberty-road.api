const { Path, Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.delete("api/paths/:id", (req, res) => {
    Path.findByPk(req.param.id).then((path) => {
      const pathDeleted = path;
      Path.destroy({
        where: { id: path.id },
      }).then((_) => {
        const message = `Le chemin avec l'identifiant numéro  ${pathDeleted.id} a bien été supprimé !`;
        res.json({ message, data: pathDeleted });
      });
    });
  });
  app.delete("api/hikker/:id", (req, res) => {
    Hikker.findByPk(req.param.id).then((hikker) => {
      const hikkerDeleted = hikker;
      Hikker.destroy({
        where: { id: hikker.id },
      }).then((_) => {
        const message = `Le chemin avec l'identifiant numéro  ${hikkerDeleted.id} a bien été supprimé !`;
        res.json({ message, data: hikkerDeleted });
      });
    });
  });
};
