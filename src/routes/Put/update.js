module.exports = (app, url, model, messageCible) => {
  app.put(`/api/${url}/:id`, (req, res) => {
    const id = parseInt(req.params.id) 
    model.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        model.findByPk(id).then((item) => {
          if (item === null || item.is_deleted) {
            const message = `${messageCible} n'existe pas`;
            res.status(404).json(messageCible)
          } else {
            const message = `${messageCible} a bien été modifié !`;
            res.json({ message, data: item });
          }
        })
        .catch(err => {
          const message = `${messageCible} n'a pas pu être créé. Réessayer plus tard !`
          res.status(500).json({message, data: err})
        });
      })
      .catch(err => {
        const message = `${messageCible} n'a pas pu être créé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};