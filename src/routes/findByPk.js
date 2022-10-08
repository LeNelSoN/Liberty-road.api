const { Hikker, Path, LatLong } = require('../db/sequelize')
const auth = require('../auth/auth');

module.exports = (app, url, model, messageCible) => {
  app.get(`/api/${url}/:id/`, auth, (req, res) => {
    const hikkerId = parseInt(req.headers.hikkerid);
    if (url === "hikkers" && req.query.with == "paths") {
      Hikker.findByPk(req.params.id).then((hikker) => {
        const id = req.params.id
        Path.findAll({
          where:{
            hikkerId: id
          }
        }).then((paths) => {
          const message = "L'utilisateur a bien été trouvé !";
          res.json({message, data: {hikker, paths}})
        });
      })      
      .catch(err => {
        const message = `La liste des ${messageCible} n'a pas pu être trouvé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      });
    } else if (url === "paths" && req.query.with == "latlongs") {
      Path.findByPk(req.params.id).then((path) => {
        LatLong.findAll({
          where: {
            pathId: req.params.id,
          },
        }).then((latlongs) => {
          const message = "Le chemin a bien été trouvé !";
          res.json({message, data: {path, latlongs}})
        })      
        .catch(err => {
          const message = `La liste des ${messageCible} n'a pas pu être trouvé. Réessayer plus tard !`
          res.status(500).json({message, data: err})
        });;
      });
    } else {
      model.findByPk(req.params.id).then((item) => {
        if(item === null) {
          const message = `${messageCible} a été supprimé!`;
          res.status(403).json({message})
          return
        }
        const message = `${messageCible} a bien été trouvé !`;
        res.json({message, data: item})
      })      
      .catch(err => {
        const message = `La liste des ${messageCible} n'a pas pu être trouvé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      });;
    }
  })      
};
