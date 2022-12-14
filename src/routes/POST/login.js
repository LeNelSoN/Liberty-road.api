const { Profile } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require('../../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    console.log('Connection')
      Profile.findOne({ where: { login: req.body.login } }).then(user => {
        if(!user){
            const message = "L'utilisateur demandé n'éxiste pas"
            return res.status(400).json({message})
        }

      passwordVerify(req.body.password, user.password)
        .then(isPasswordValid => {
          if(!isPasswordValid) {
            const message = `Le Mot de passe est incorrect`;
            return res.status(401).json({ message })
          }
        
          //JWT
          const token = jwt.sign(
            { hikkerId: user.hikkerId,
              isAdmin: user.isAdmin
            },
            privatekey,
            { expiresIn: '24h' },
          )

          const message = `L'utilisateur a été connecté avec succés`;
          return res.status(200).json({ message, data: user, token:{token_type:"Bearer", expires_in:86400000,access_token:token} })
        })
      })
    .catch(err => {
        const message = "L'utilisateur n'a pas pu être connecté. Réessayez plus tard !"
        return res.status(400).json({message, data: err})
    })
  })
}