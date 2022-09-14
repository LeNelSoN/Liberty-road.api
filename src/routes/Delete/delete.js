module.exports = (app, url, model, messageCible) => {
  app.patch(`/api/${url}/:id`, (req, res) => {
    const id = parseInt(req.params.id) 
    model.update(
      {is_deleted: true}, 
      {
      where: { id: id }
    })
      .then(_ => {
        model.findByPk(id).then((item) => {
          const message = `${messageCible} a bien été supprimé !`;
          res.json({ message, data: item });
        });
      })
  });
};