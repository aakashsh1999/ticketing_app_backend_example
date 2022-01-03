const mysql = require('mysql2');

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"ticketing_backend",
    multipleStatements:true
});

module.exports=conn;