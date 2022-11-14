const express = require("express");

const app = express();
require('dotenv').config();
const port = process.env.LOCAL_PORT || 5000;

const bodyParser = require("body-parser");
const { initDB, 
        Path,
        Hikker,
        LatLong,
        Profile } = require('./src/db/sequelize')

const TableRelation = require('./src/models/relationship')

//CORS
const cors = require('cors')

app.use(cors({origin:true, credentials: true})).use(bodyParser.json());

// app
// .use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    initDB();    
}

TableRelation();

//EndPoints:
//Creation de compte
require('./src/routes/POST/mail')(app)

//Registration
require('./src/routes/GET/registration')(app);

//Login
require('./src/routes/POST/login')(app);

//Check
require('./src/routes/GET/check')(app);

//CreatePaths
require('./src/routes/POST/createPaths')(app)

//Read
require('./src/routes/GET/findHikkers')(app)
require('./src/routes/GET/findPaths')(app)
//Is Admin
require('./src/routes/GET/findAll')(app)

//Update
require('./src/routes/PUT/updatePath')(app)
require('./src/routes/PUT/updateHikkers')(app)

//Recuperation
require('./src/routes/POST/recuperation')(app)

//Delete
require('./src/routes/PATCH/delete')(app)

//ERREUR 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Essayer une autre URL !';
    res.status(404).json({message})
})

app.get('/', (req, res) => {
    const message = `Hello Node !!!`;
    res.json({ message});
})

app.listen(port, () =>
console.log(`L'application est démarrée sur : http://localhost:${port} !`)
);

