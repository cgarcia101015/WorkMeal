DROP DATABASE IF EXISTS meals_db;
CREATE DATABASE meals_db;

CREATE TABLE foods 
( 
User_Name_ID int(9) NOT NULL auto_increment, 
Main_Ingredien VARCHAR(40) NOT NULL, 
Title VARCHAR(40) NOT NULL, 
Url_to_Recipe URL(200) NOT NULL,
PRIMARY KEY(ID)
);