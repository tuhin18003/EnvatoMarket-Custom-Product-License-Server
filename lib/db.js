var mysql = require('mysql2');
var config = require('../config.js');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createPool( config.MYSQL_CRED );
    }
    console.log( 'Database Status : Conected' );
    return db;
}

module.exports = connectDatabase();