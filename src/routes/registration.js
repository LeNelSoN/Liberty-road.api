const { Profile, Hikker } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/registration', (req, res) => {
        const login = req.body.login;
        const pseudo = req.body.pseudo
        const password = req.body.password
        const address = req.body.address
        if (login === null || login === undefined || password === null || password === undefined)
        {
            return res.status(400).json({error:"parametre(s) manquant"})
        }else{
            Profile.findOne({ where: { login: login } }).then(user => {
                if(user){
                    const message = "L'utilisateur demandé existe déjà"
                    return res.status(409).json({message})
                }
                const appUserId = 0;
                bcrypt.hash(password, 10)
                    .then(hash => {
                        return Profile.create({login, password: hash})
                    })
                    .then(profil=> {
                        const {dataValues:{id}} = profil
                        return profil.createHikker({username: pseudo, address})
                    })
                    .then(hikker => {
                        const {dataValues:{id}, appUserId} = hikker
                        console.log(id, appUserId)
                        return Profile.update({hikkerId:id}, {
                            where: { id: appUserId },
                          }).then(_ => res.status(201).json({message: "l'utilisateur a été créé"}))
                    })
                    .catch(err => {
                        const message = "L'utilisateur n'a pas pu être créé. Réessayez plus tard !"
                        return res.json({message, data: err})
          })
        })
        }
        
  })}