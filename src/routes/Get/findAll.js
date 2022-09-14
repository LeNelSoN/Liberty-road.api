module.exports = (app, url, model, messageCible) => {
  app.get(`/api/${url}`, (req, res) => {
    model.findAll({
      where : 
      {is_deleted:false}}
    )
      .then((items) => {
        const message = `La liste des ${messageCible} a bien été récupérée.`;
        res.json({ message, data: items });
      })
      .catch(err => {
        const message = `La liste des ${messageCible} n'a pas pu être trouvé. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
    });
};

