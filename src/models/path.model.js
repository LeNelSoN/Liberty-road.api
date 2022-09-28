module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "path",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
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


