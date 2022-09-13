const { Profile } = require("../../db/sequelize");

module.exports = (app) => {
  app.patch("/api/profiles/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    Profile.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        Profile.findByPk(id).then((profile) => {
          const message = `Le profile a bien été supprimé !`;
          res.json({ message, data: profile });
        });
      })
  });
};