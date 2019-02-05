var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "jim",
  password: "bunny",
  database: "meals_db"
});

var connection = mysql.createConnection(
process.env.JAWSDB_URL
);


// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});   
 connection.query("select * meals_db" , function(error, result){
    // res.render("index" , {data: result})
    console.log(result)
})

// Export connection for our ORM to use.
module.exports = connection;