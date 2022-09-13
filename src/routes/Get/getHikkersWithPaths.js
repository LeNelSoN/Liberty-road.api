const { Hikker } = require("../../db/sequelize");
const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/hikkers/:id/paths", (req, res) => {
    Hikker.findByPk(req.params.id)
      .then((hikker) => {
        Path.findAll({where:{
            hikkerId: req.params.id
        }}).then(paths => {
            const message = "L'utilisateur a bien été trouvé !";
            hikker.is_deleted ? res.json("L'utilisateur a été supprimé") : res.json({ message, data: hikker, paths });
          })
      })
  });
};
