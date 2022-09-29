const { Profile, Hikker } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/registration', (req, res) => {
        const login = req.body.login;
        const pseudo = req.body.pseudo
        const password = req.body.password

        if (login === null ||password === null)
        {
            return res.status(400).json({"error":"parametre(s) manquant"})
        }else{
            Profile.findOne({ where: { login: login } }).then(user => {
                if(user){
                    const message = "L'utilisateur demandé éxiste déjà"
                    return res.status(400).json({message})
                }
                const appUserId = 0;
                bcrypt.hash(password, 10)
                    .then(hash => {
                        return Profile.create({login, password: hash})
                    })
                    .then(profil=> {
                        
                        return profil.createHikker({username: pseudo})
                        //TODO mettre a jour l'id
                    })
                    .then(_ => {
                        return res.status(201).json({message: "l'utilisateur a été créé"}) 
                    })
                    .catch(err => {
                        const message = "L'utilisateur n'a pas pu être créé. Réessayez plus tard !"
                        return res.json({message, data: err})
          })
        })
        }
        
  })}