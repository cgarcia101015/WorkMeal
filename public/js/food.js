// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "food" model that matches up with DB
var food = sequelize.define("food", {
  // the routeName gets saved as a string
  Username: Sequelize.STRING,
  // the name of the character (a string)
  Main_Ingredien: Sequelize.STRING,
  // the character's role (a string)
  Title: Sequelize.STRING,
  // the character's age (a string)
  Url_to_Recipe: Sequelize.STRING,
  
}, {
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  foodtable: true
});

// Syncs with DB
food.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = food;
