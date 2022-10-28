const auth = require('../../auth/auth')

const { LatLong, Path } = require('../../db/sequelize')
module.exports = (app) => {
  app.post(`/api/paths`, auth, (req, res) => {
      Path.create(req.body)
      .then(item => {
        if(item){
          const {dataValues:{id}} = item
          const latlongs = req.body.latlongs
          latlongs.map(item => item.pathId = id)
          LatLong.bulkCreate(latlongs)
            .then(_ =>{ 
              const message = `Le Chemin a bien été crée`;
              res.json({ message, data: item });
              return
            })
            .catch(err => {
              Path.destroy({
                  where: {
                    id: id
                  },
                  force: true
                })
                const message = `Le Chemin n'a pas pu être créé!`
                res.status(500).json({message, data: err})
                return item
              })
        }
      })
      .catch(err => {
        const message = `Le Chemin n'a pas pu être créé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};
