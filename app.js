const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const { initDB, Hikker, Path, LatLong, Profile, Friend } = require('./src/db/sequelize')
const TableRelation = require('./src/models/relationship')

const swaggerUi = require('swagger-ui-express');
const YAML= require('yamljs');
const swaggerJsDocs=YAML.load('./api.yaml');

//CORS
const cors = require('cors')

//Documentation: http://localhost:5000/api-docs/
app.use(cors({origin:true, credentials: true})).use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs)).use(bodyParser.json());

// app
// .use(bodyParser.json());

initDB();
TableRelation();

//EndPoints:
const tableForRoutes = [
    ['hikkers', Hikker, "utilisateur(s)"],
    ['paths', Path, 'chemin(s)'],
    // ['latlongs', LatLong , 'Coordonnée(s)'],
    // ['profiles', Profile, 'Profile(s)'],
    // ['friends', Friend, 'Amitié']
]

tableForRoutes.map(
    item => {
        //Create
        require('./src/routes/create')(app, item[0], item[1], item[2])
        //READ
        // require('./src/routes/findAll')(app, item[0], item[1], item[2]);
        require('./src/routes/findByPk')(app, item[0], item[1], item[2]); 
        //Update
        require('./src/routes/update')(app, item[0], item[1], item[2]);
        //Delete
        require('./src/routes/delete')(app, item[0], item[1], item[2]);
    }
)

//LOGIN
require('./src/routes/login')(app);

//CHECK
require('./src/routes/check')(app);

//REGISTRATION
require('./src/routes/registration')(app);

//ERREUR 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Essayer une autre URL !';
    res.status(404).json({message})
})

app.listen(port, () =>
console.log(`L'application est démarrée sur : http://localhost:${port} !`)
);

