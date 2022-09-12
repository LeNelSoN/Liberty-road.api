const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const { initDB } = require('./src/db/sequelize')
const TableRelation = require('./src/models/relation')

app
.use(morgan("dev"))
.use(bodyParser.json());

initDB();
TableRelation();

//EndPoints:

//Create
const PostOnePath = require('./src/routes/Post/createPaths');
PostOnePath(app);

const PostOneHikker = require('./src/routes/Post/createHikkers');
PostOneHikker(app);

//READ
const GetAllPaths = require('./src/routes/Get/findAllPaths');
GetAllPaths(app);

const GetAllHikkers = require('./src/routes/Get/findAllHikkers');
GetAllHikkers(app);

const GetOnePath = require('./src/routes/Get/findByPkPaths');
GetOnePath(app); 

const GetOneHikker = require('./src/routes/Get/findByPkHikkers');
GetOneHikker(app); 

//Update
const PutOne = require('./src/routes/Put/updateHikkers');
PutOne(app);

//Delete Hard
const DeletedOnePath = require('./src/routes/Delete/deletePath.route');
DeletedOnePath(app);

app.listen(port, () =>
console.log(`L'application est démarrée sur : https://localhost:${port} !`)
);

