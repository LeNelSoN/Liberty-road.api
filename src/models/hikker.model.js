module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "hikker",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
};
