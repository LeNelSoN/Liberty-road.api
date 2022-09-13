const { Path } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/paths", (req, res) => {
    Path.findAll({
      where : 
      {is_deleted:false}}
    )
      .then((paths) => {
        const message = "La Liste des Chemins a bien été récupérée.";
        res.json({ message, data: paths });
      })
      .catch(err => {
        const message = "La liste des Chemins n'a pas pu être trouvé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
    });
};
