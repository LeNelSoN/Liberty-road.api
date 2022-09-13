const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/profiles/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Profile.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        Hikker.findByPk(id)
          .then((hikker) => {
            if (hikker === null || hikker.is_deleted) {
              const message = "Le Profil n'existe pas";
              res.status(404).json(message);
            } else {
              const message = "Le Profil a bien été modifié !";
              res.json({ message, data: hikker });
            }
          })
          .catch((err) => {
            const message =
              "Le Profil n'a pas pu être créé. Réessayer plus tard !";
            res.status(500).json({ message, data: err });
          });
      })
      .catch((err) => {
        const message = "Le Profil n'a pas pu être créé. Réessayer plus tard !";
        res.status(500).json({ message, data: err });
      });
  });
};
