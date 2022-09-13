const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/latlongs/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    LatLong.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        LatLong.findByPk(id).then((latlong) => {
          if (latlong === null || latlong.is_deleted) {
            const message = "La coordonée n'existe pas";
            res.status(404).json(message)
          } else {
            const message = "La coordonée a bien été modifié !";
            res.json({ message, data: latlong });
          }
        })
        .catch(err => {
          const message = "La coordonée n'a pas pu être créé. Réessayer plus tard !"
          res.status(500).json({message, data: err})
        });
      })
      .catch(err => {
        const message = "La coordonée n'a pas pu être créé. Réessayer plus tard !"
        res.status(500).json({message, data: err})
      })
  });
};
