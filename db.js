const mysql = require('mysql2');

const conn = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user:"sql6462966",
    password:"hTv2ZCLSra",
    database:"sql6462966",
    multipleStatements:true
});

module.exports=conn;