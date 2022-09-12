const { Path, Hikker, LatLong } = require('../db/sequelize')

module.exports = TableRelation = () => {
    Hikker.hasOne(Path);
    Path.belongsTo(Hikker);

    Path.hasOne(LatLong);
    LatLong.belongsTo(Path);
  }