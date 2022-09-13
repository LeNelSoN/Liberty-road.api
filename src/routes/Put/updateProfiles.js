const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/profiles/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Profile.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        Hikker.findByPk(id).then((hikker) => {
          const message = `Le Profil a bien été modifié !`;
          res.json({ message, data: hikker });
        });
      })
  });
};
