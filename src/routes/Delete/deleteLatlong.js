const { LatLong } = require("../../db/sequelize");

module.exports = (app) => {
  app.patch("/api/latlongs/:id", (req, res) => {
    const id = parseInt(req.params.id) 
    LatLong.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        LatLong.findByPk(id).then((latlong) => {
          const message = `La coordonée a bien été supprimé !`;
          res.json({ message, data: latlong });
        });
      })
  });
};