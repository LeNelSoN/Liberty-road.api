const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        type:'oauth2',
        user:'nelis.valentin@gmail.com',
        clientId:'814380148401-0jcaur5u0vbmnoaeu16s8ab65c01l397.apps.googleusercontent.com',
        clientSecret:'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',
        pass:'*Hc4uxgzwxb*'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    }
})

const options = {
    from: 'nelis.valentin@gmail.com',
    to:'nelis.valentin@gmail.com',
    subject:'Test',
    text:" Ceci est un test"
}

transporter.sendMail(options, (err, info)=> {
    if(err){
        console.log(err)
        return
    }
    console.log("info: " + info.response)
})