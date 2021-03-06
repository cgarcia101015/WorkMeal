var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
        // msg: "Welcome!",
        examples: dbRecipes
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbRecipes
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
