var db = require("../models");

module.exports = function(app) {
  // Get all recipes
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  
  // get the restaurants
  app.get("/api/restaurants", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  // Create a new recipes
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.post("/api/restaurants", function(req, res) {
    db.Restaurant.create(req.body).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });


  // Delete an recipes by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.delete("/api/restaurants/:id", function(req, res) {
    db.Restaurant.destroy({ where: { id: req.params.id } }).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

};
