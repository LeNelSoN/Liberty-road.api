const auth = require('../auth/auth');
const { LatLong } = require('../db/sequelize');

module.exports = (app, url, model, messageCible) => {
  app.put(`/api/${url}/:id`, auth, (req, res) => {
    const id = parseInt(req.params.id) 
    model.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return model.findByPk(id).then((item) => {
          if (item === null) {
            const message = `${messageCible} n'existe pas`;
            res.status(403).json({message})
          } else {
            const message = `${messageCible} a bien été modifiée !`;
            res.json({ message, data: item });
          }
          if(url === "paths"){
            LatLong.findAll({
              where: {pathId: id}
            })
            .then(latlongs => latlongs.map(latlongDeleted => latlongDeleted.destroy({force:true}))) 
            req.body.latlongs.map(({latitude, longitude}) => LatLong.create({latitude, longitude, pathId: id}))
          }
        })
      })
      .catch(err => {
        const message = `${messageCible} n'a pas pu être modifiée. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};