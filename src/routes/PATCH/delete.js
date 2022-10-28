const auth = require('../../auth/auth')

module.exports = (app, url, model, messageCible) => {
  app.patch(`/api/${url}/:id`, auth, (req, res) => {
    const id = parseInt(req.params.id);
    model.destroy({where: {id : id}})
      .then(_ => {
            const message = `${messageCible} a bien été supprimé !`;
            res.json({ message});
      })
      .catch((err) => {
        const message = `${messageCible} n'a pas pu être supprimé. Réessayer plus tard !`;
        res.status(500).json({ message, data: err });
      });
  });
};
