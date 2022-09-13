const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("api/latlongs/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    LatLong.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        LatLong.findByPk(id).then((latlong) => {
          const message = `La coordonée a bien été modifié !`;
          res.json({ message, data: latlong });
        });
      })
  });
};
