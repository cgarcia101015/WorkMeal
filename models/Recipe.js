module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    recipeURL: DataTypes.STRING
  });
  return Recipe;
};
