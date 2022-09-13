const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/hikkers/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Hikker.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        Hikker.findByPk(id).then((hikker) => {
          if (hikker === null || hikker.is_deleted) {
            const message = "Le Chemin n'existe pas";
            res.status(404).json(message)
          } else {
            const message = "Le Chemin a bien été modifié !";
            res.json({ message, data: hikker });
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
