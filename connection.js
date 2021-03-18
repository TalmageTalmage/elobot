var mysql = require('mysql2');
//imports host specifics
const config = require('./config.json');
var con;


//creates sql connection
con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: "serverElo",
    port: 3306,
});

con.connect(error => {

    if (error) {
        console.log("error, bot reset")
    }
    console.log("Connected!")

}
);
//exports sql connection
module.exports = con;
