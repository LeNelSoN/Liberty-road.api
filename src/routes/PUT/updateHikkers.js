const auth = require('../../auth/auth');
const { Hikker, Profile } = require('../../db/sequelize');

module.exports = (app) => {
  app.put(`/api/hikkers/:id`, auth, (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const address = req.body.address
    const requestBody = {}
    if (username.trim() !== "") {
      requestBody.username = username.trim()
    }
    if (address.trim() !== "") {
      requestBody.address = address.trim()
    }
    console.log(requestBody)
    const id = parseInt(req.params.id) 
    Hikker.update(requestBody, {
      where: { id: id },
    })
      .then((_) => {
        return Hikker.findByPk(id).then((item) => {
          if (item === null) {
            const message = `L'utilisateur n'existe pas`;
            res.status(403).json({message})
          } else {
            const message = `L'utilisateur a bien été modifiée !`;
            res.json({ message, data: item });
          }
        })
      })
      .catch(err => {
        const message = `L'utilisateur n'a pas pu être modifiée. Réessayer plus tard !`
        res.status(500).json({message, data: err})
      })
  });
};