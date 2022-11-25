const auth = require('../../auth/auth');
const { Path, Hikker } = require('../../db/sequelize');

module.exports = (app) => {
  app.patch(`/api/hikkers/:id`, auth, (req, res) => {
    const id = parseInt(req.params.id);
    Hikker.destroy({where: {id : id}})
      .then(_ => {
            const message = `L'utilisateur a bien été supprimé !`;
            res.json({ message});
      })
      .catch((err) => {
        const message = `L'utilisateur n'a pas pu être supprimé. Réessayer plus tard !`;
        res.status(500).json({ message, data: err });
      });
  });
  
  app.patch(`/api/paths/:id`, auth, (req, res) => {
    const id = parseInt(req.params.id);
    Path.destroy({where: {id : id}})
      .then(_ => {
            const message = `Le chemin a bien été supprimé !`;
            res.json({ message});
      })
      .catch((err) => {
        const message = `Le chemin n'a pas pu être supprimé. Réessayer plus tard !`;
        res.status(500).json({ message, data: err });
      });
  });
};
