module.exports = (app) => {
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
                    user: 'nelis.valentin@gmail.com',
                    pass: 'yfmwaywafrhnxhtc'
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
