const jwt = require('jsonwebtoken')
const privatekey = require('../../auth/private_key')
const {Profile, Hikker} = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/registration', (req, res) => {
        let login = req.body.login;
        const pseudo = req.body.pseudo
        const password = req.body.password
        const address = req.body.address
        
        if (login === null || login === undefined || login === ""
        || password === null || password === undefined || password === ""
        || pseudo === null || pseudo === undefined || pseudo === "")
        {
            return res.status(400).json({message:"Un ou plusieurs parametres manquant !!"})
        }
        
        Hikker.findOne({where: {username: pseudo}})
        .then(hikker => {
            if(hikker){
                const message = "L'utilisateur demandé existe déjà"
                return res.status(409).json({message, data: hikker})
            }})

        Profile.findOne({ where: { login: login } }).then(user => {
            if(user){
                const message = "L'utilisateur demandé existe déjà"
                return res.status(409).json({message, data:login})
            }})
        .then(_ =>{

            const createdToken = jwt.sign(
                {   
                    login,
                    pseudo,
                    password,
                    address
                },
                privatekey,
                { expiresIn: '1h' },
              )
    
            const nodemailer = require('nodemailer')
            const transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 465,
                secure: true,
                auth:{

                }
            })
            
            const options = {
                from: 'nelis.valentin@gmail.com',
                to: login,
                subject:`Mail inscription ${pseudo}`,
                html:`Cliquez sur ce <a target='_blank' href='http://localhost:5000/api/registration/${createdToken}'>lien</a> pour valider la création de votre compte et connectez vous`
            }
            
            transporter.sendMail(options)
            .then(_ => {
                const message = 'Un mail de confirmation vous a été transmis'
                return res.json({message})
            })  
        }

        )
        .catch(err => {
            const message = "L'utilisateur n'a pas pu être créé. Réessayez plus tard !"
            return res.json({message, data: err})
        })

    })

    app.post('/api/recuperation', (req, res) => {
        let login = req.body.login;
        
        if (login === null || login === undefined || login === "")
        {
            return res.status(400).json({message:"Un ou plusieurs parametres manquant !!"})
        }
        
        Profile.findOne({ where: { login: login } }).then(user => {
            if(!user){
                const message = "L'utilisateur demandé n'existe pas"
                return res.status(409).json({message, data:login})
            }
            const login = user.login

            const createdToken = jwt.sign(
                {   
                    login,
                },
                privatekey,
                { expiresIn: '1h' },
              )
    
            const nodemailer = require('nodemailer')
            const transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 465,
                secure: true,
                auth:{

                }
            })
            
            const options = {
                from: 'nelis.valentin@gmail.com',
                to: login,
                subject:`Mot de passe Oublié`,
                html:`Cliquez sur ce <a target='_blank' href='http://localhost:3000/recuperation/${createdToken}'>lien</a> changer votre mot de passe`
            }
            
            transporter.sendMail(options)
            .then(_ => {
                const message = 'Un mail de confirmation vous a été transmis'
                return res.json({message})
            })  
        })
        .catch(err => {
            const message = "Il semblerai qu'il y est un probléme. Réessayez plus tard !"
            return res.json({message, data: err})
        })

    })
}