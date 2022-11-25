const auth = require('../../auth/auth');
const { Path, Hikker, Profile, LatLong} = require('../../db/sequelize');

module.exports = (app) => {
  app.get(`/api/paths`, auth, (req, res) => {
    //TODO IsAdmin verif
    Path.findAll()
      .then((items) => {
        const message = `La liste des chemins a bien été récupérée.`;
        res.json({ message, data: items });
      })
      .catch(err => {
        const message = `La liste des chemins n'a pas pu être trouvé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
    });

  app.get(`/api/hikkers`, auth, (req, res) => {
    //TODO IsAdmin verif
    Hikker.findAll({
      include: [{
        model: Profile
      }]
    })
      .then((items) => {
        const message = `La liste des utilisateurs a bien été récupérée.`;
        res.json({ message, data: items });
      })
      .catch(err => {
        const message = `La liste des utilisateurs n'a pas pu être trouvé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
    });

};

