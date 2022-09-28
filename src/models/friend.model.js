module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "friend",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        }
      },
      {
        updatedAt: false,
        timestamps: true,
        paranoid: true  
      }

    );
  };