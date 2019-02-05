<?php
$servername = "localhost";
$username = "jim";
$password = "bunny";
$dbname = "meals_db";

// Create connection
$conn = new mysqli($localhost, $jim, $bunny, $meals_db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO foods (User_Name_ID, Main_Ingredien , Title, Url_to_Recipe)
VALUES ('Bill', 'all the pizza in the world', 'john@Sicilian Pizza "La Regina"' , 'https://www.chowhound.com/recipes/sicilian-pizza-la-regina-pizza-31228)');)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
