const auth = require('../../auth/auth');
const { LatLong, Path } = require('../../db/sequelize');

module.exports = (app) => {
  app.put(`/api/paths/:id`, auth, (req, res) => {
    const id = parseInt(req.params.id) 
    Path.update(req.body, {
      where: { id },
    })
      .then((_) => {
        return Path.findByPk(id).then((item) => {
          if (item === null) {
            const message = `Le chemin n'existe pas`;
            res.status(403).json({message})
          } else {
            const message = `Le chemin a bien été modifiée !`;
            res.json({ message, data: item });
          }
          LatLong.findAll({
            where: {pathId: id}
          })
          .then(latlongs => latlongs.map(latlongDeleted => latlongDeleted.destroy({force:true}))) 
          req.body.latlongs.map(({latitude, longitude}) => LatLong.create({latitude, longitude, pathId: id}))
        })
      })
      .catch(err => {
        const message = `Le chemin n'a pas pu être modifiée. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};