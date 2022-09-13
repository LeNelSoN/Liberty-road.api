const { Hikker } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/hikkers/:id", (req, res) => {
    Hikker.findByPk(req.params.id)
      .then((hikker) => {
        const message = "L'utilisateur a bien été trouvé !";
        hikker.is_deleted ? res.json("L'utilisateur a été supprimé") : res.json({ message, data: hikker });
      })
  });
};
