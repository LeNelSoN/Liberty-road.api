module.exports = (app, url, model, messageCible) => {
  app.get(`/api/${url}/:id`, (req, res) => {
    model.findByPk(req.params.id)
      .then((item) => {
        const message = `${messageCible} a bien été trouvé !`;
        item.is_deleted ? res.json("L'utilisateur a été supprimé") : res.json({ message, data: item });
      })
  });
};
