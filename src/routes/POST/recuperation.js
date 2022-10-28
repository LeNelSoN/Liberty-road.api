const {Profile} = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.post('/api/reset', (req, res) => {
        
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const password = req.body.password

        let login

        jwt.verify(token, privateKey, (error, decodedToken) => {
            login = decodedToken.login
            if(error) {
                const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
                return res.status(401).json({ message, data: error })
              }

            Profile.findOne({ where: { login: login } }).then(user => {
                if(!user){
                    const message = "L'utilisateur n'existe pas"
                    return res.status(409).json({message, data:login})
                }
    
                bcrypt.hash(password, 10)
                    .then(hash => {
                        Profile.update({login, password: hash}, {where: { login }})
                        .then(_ => {
                            const message = "Le mot de passe a été modifié."
                            res.json({message, data: err})
                        })
                    })
                })
            .catch(err => {
                const message = "Le mot de passe n'a pas été modifié. Réessayez plus tard !"
                return res.json({message, data: err})
            })

        })

    })

}