const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

/*
connection.connect( err => {
    if (err) console.log("Error: ", err)
    console.log('Connected to MySQL server.');

    // create database if not exists
    let createDB = `CREATE DATABASE IF NOT EXISTS mydb;`;
    connection.query(createDB, function(err, result, fields){
        if(err) throw err;
    });

    connection.query('USE mydb;', (err, result) =>{
        if(err) console.log(err);
    })
    let createUserTable = `
    CREATE TABLE IF NOT EXISTS users(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        address varchar(255)
    );`;
    connection.query(createUserTable, (err, result, fields) => {
        if(err) console.log(err.message);
    })
});
*/

module.exports = connection