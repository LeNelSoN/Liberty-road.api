const { Hikker, Path, LatLong } = require('../db/sequelize')

module.exports = (app, url, model, messageCible) => {
  app.get(`/api/${url}/:id/:opt`, (req, res) => {
    if (url === "hikkers" && req.params.opt === "paths") {
      Hikker.findByPk(req.params.id).then((hikker) => {
        Path.findAll({
          where: {
            hikkerId: req.params.id,
          },
        }).then((paths) => {
          const message = "L'utilisateur a bien été trouvé !";
          hikker.is_deleted
            ? res.status(403).json("L'utilisateur a été supprimé")
            : res.json({ message, data: hikker, paths });
        });
      });
    } else if (url === "paths" && req.params.opt === "latlongs") {
      Path.findByPk(req.params.id).then((path) => {
        LatLong.findAll({
          where: {
            pathId: req.params.id,
          },
        }).then((latlongs) => {
          const message = "Le chemin a bien été trouvé !";
          path.is_deleted
            ? res.status(403).json("Le chemin a été supprimé")
            : res.json({ message, data: path, latlongs });
        });
      });
    } else {
      model.findByPk(req.params.id).then((item) => {
        const message = `${messageCible} a bien été trouvé !`;
        item.is_deleted
          ? res.status(403).json("L'utilisateur a été supprimé")
          : res.json({ message, data: item });
      });
    }
  });
};
