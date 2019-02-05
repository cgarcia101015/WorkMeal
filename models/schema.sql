DROP DATABASE IF EXISTS meals_db;
CREATE DATABASE meals_db;

CREATE TABLE foods 
( 
ID int NOT NULL AUTO_INCREMENT,
email varchar(20) null,    
Username VARCHAR(10) NOT null, 
Main_Ingredien VARCHAR(40) NOT NULL, 
Title VARCHAR(40) NOT NULL, 
Url_to_Recipe varchar(200) NOT NULL,
PRIMARY KEY(ID)
);