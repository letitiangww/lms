/**
 *  Contains database related connections
 */

const mysql = require('mysql');


const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'TIC2601',
    database: 'lms'

});

console.log('Connecting to database...')

connection.connect(err => {
    if (err) {
        return err;
    } else {
        console.log('Succesful Connection to Database');
    }
});

module.exports = connection;