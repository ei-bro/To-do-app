const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();


// const mysqlConnection = mysql.createConnection({
// 	user: "admin", // replace with your username
// 	password: "123456", // replace with your password
// 	host: "localhost", // replace with localhost or 127.0.0.1
// 	database: "task_manager", // replace with your database name
// });



var connection = mysql.createPool({
	host: "217.21.76.151",
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,

});



module.exports = connection;
