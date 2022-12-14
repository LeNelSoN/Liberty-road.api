const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')
require('dotenv').config();

//Models
const { PathModel, hikkerModel, latlongModel, profileModel } = require("../models/index.model");
const Data = require("./index.db");
const { creatHash } = require("../auth/hashPassword.service");

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize("liberty_road", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
}else{
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  });
}

const Path = PathModel(sequelize, DataTypes);
const Hikker = hikkerModel(sequelize, DataTypes);
const LatLong = latlongModel(sequelize, DataTypes);
const Profile = profileModel(sequelize, DataTypes);

const initDB = () => {

  return sequelize.sync(
    { force: true }
    )
    .then((_) => {
    console.log('la base de donnée "Liberty Road" a bien été synchronisée.');
    
    creatHash('LePassword')
    .then(hash => {
      Profile.create({login:'nelis.valentin@gmail.com', password: hash, isAdmin: 1})
    }
  )});
};

module.exports = {
  sequelize,
  initDB,
  Path,
  Hikker,
  LatLong,
  Profile
};
