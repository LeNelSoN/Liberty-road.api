const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("/api/paths/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Path.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        Path.findByPk(id).then((path) => {
          if (path === null || path.is_deleted) {
            const message = "Le Chemin n'existe pas";
            res.status(404).json(message)
          } else {
            const message = "Le Chemin a bien été modifié !";
            res.json({ message, data: path });
          }
        })
        .catch(err => {
          const message = "Le Chemin n'a pas pu être créé. Réessayer plus tard !"
          res.status(500).json({message, data: err})
        });
      })
      .catch(err => {
        const message = "Le Chemin n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
