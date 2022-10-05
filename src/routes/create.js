const auth = require('../auth/auth')

const { LatLong } = require('../db/sequelize')
module.exports = (app, url, model, messageCible) => {
  app.post(`/api/${url}`, auth, (req, res) => {
    if(url == "paths"){
      model.create(req.body)
      .then(item => {
        if(item){
          const {dataValues:{id}} = item
          const latlongs = req.body.latlongs
          latlongs.map(item => item.pathId = id)
          console.log(latlongs)
          LatLong.bulkCreate(latlongs)
            .then(_ =>{ 
              const message = `${messageCible} a bien été crée`;
              res.json({ message, data: item });
              return
            })
            .catch(err => {
                  model.destroy({
                    where: {
                      id: id
                    },
                    force: true
                  })
                  const message = `${messageCible} n'a pas pu être créé!`
                  res.status(500).json({message, data: err})
                  return item
                })
        }
      })
      .catch(err => {
        const message = `${messageCible} n'a pas pu être créé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
    }
    else if(url == 'friends'){
      model.create(req.body)
      .then((item) => {
        const message = `${messageCible} a bien été crée`;
        res.json({ message, data: item });
      })
      .catch(err => {
        const message = `${messageCible} n'a pas pu être créé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
    }
  });
};
