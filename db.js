const mysql = require('mysql');

const conn = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user:"sql6457008",
    password:"Ug9BJw6P5W",
    database:"sql6457008",
    multipleStatements:true
});

module.exports=conn;