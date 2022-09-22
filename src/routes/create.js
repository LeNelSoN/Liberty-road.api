const auth = require('../auth/auth')

const { LatLong } = require('../db/sequelize')
module.exports = (app, url, model, messageCible) => {
  app.post(`/api/${url}`, auth, (req, res) => {
    model.create(req.body)
      .then((item) => {
        const message = `${messageCible} ${req.body.name} a bien été crée`;
        res.json({ message, data: item });
      })
      .catch(err => {
        const message = `${messageCible} n'a pas pu être créé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};
