/**
 * Importing dependant modules 
 */
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
const connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: 'TIC2601',
	database: 'test'

});

connection.connect(err => {
	if (err) {
		return err;
	} else {
		console.log('Succesful Connection to Database');
	}
});

//Page Rendering - Log In
app.set('views', path.join(__dirname, '/pages'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
	res.render('sampleapp');
});

app.get('/tests', (req, res) => {
	res.render('test');
});


app.listen(3000, () => {
	console.log('Sample App listening on port 3000')
});