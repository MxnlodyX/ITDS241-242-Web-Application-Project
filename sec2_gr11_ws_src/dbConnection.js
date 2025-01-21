const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
//connect to database
const dbConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
//status connect to database
dbConnection.connect(function (err) {
    if (err) {
        console.log(`Error Connecting to DB: ${err.stack}`);
        return;
    }
    console.log(`Connection DB: ${process.env.MYSQL_DATABASE}`)
})
module.exports = dbConnection;