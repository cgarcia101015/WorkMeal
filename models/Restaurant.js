module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
      restName: DataTypes.STRING,
      location: DataTypes.STRING,
      urlRest: DataTypes.STRING,
    });
    return Restaurant;
  };
  