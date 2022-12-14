const { Path, Hikker, LatLong,  Profile } = require('../db/sequelize');

module.exports = TableRelation = () => {
    Hikker.hasOne(Path);
    Path.belongsTo(Hikker);

    Path.hasOne(LatLong);
    LatLong.belongsTo(Path);

    Hikker.hasOne(Profile);
    Profile.hasOne(Hikker);
  }