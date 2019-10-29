/**
 *  Contains all of the routes used by the application
 */
const express = require('express')

const router = express.Router();

const database = require('../DataBase Project/database');

const {
    promisify,
} = require('util');

const queryAsync = promisify(database.query).bind(database);

/**
 *  SQL Queries Used - ttry to refactor into a json file
 */
var Login_Validate = 'SELECT * FROM myapp.user WHERE username = ? AND password = ?';
var user_sign_up = 'INSERT INTO test.customer (username, password, email) values (?,?,?)';



//TODO - create proper home page 
router.get('/', (request, response) => {
    response.render('home_test');
});

router.get('/register', (request, response) => {
    response.render('register');
});

// User Sign Up
router.post('/reg', function (request, response) {
    var email = request.body.email;
    var username = request.body.username;
    var password = request.body.password;

    if (email && password && username) {
        database.query(user_sign_up, [username, password, email], function (error, results, fields) {
            console.log('New Account Added to Database');
            console.log('User : %s', username);
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/profile');
            response.end();
        });
    } else {
        response.send('Something Unexpected Happen, Please Try again');
        response.end();
    }
});


router.get('/login', (req, res) => {
    res.render('login');
});

// User Log in Authentication 
router.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        database.query(Login_Validate, [username, password], function (error, results, fields) {
            console.log(password);
            if (results.length > 0) {
                console.log('User %s has Logged in', username);
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/profile');
            } else {
                response.send('Incorrect Username and/or Password!'); // Can be a redictect 
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!'); // Can be a redirect 
        response.end();
    }
});


/**
 *  Successful Log In - Profile Page 
 * 
 * TODO -> Edit Profile page and Profile Dashboard 
 */
router.get('/profile', async function (request, response) {
    if (request.session.loggedin) {
        //response.send('Welcome back, ' + request.session.username + '!');

        var testsql = 'select * from myapp.book;';

        let entries = await queryAsync(testsql);

        response.render('profile', {
            user: request.session.username,
            varialbe: request.session.password,
            entries: entries
        });

        console.log(entries);
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

// TODO -> test page for async programming
router.get('/test', async (request, response) => {
    const selectSQL = 'SELECT * FROM lms.customer where first_name like ?';

    let entries = {};

    try {
        entries = await queryAsync(selectSQL, [request.query.entries]);

        response.render('test', {
            entries: entries,
        });

        console.log(selectSQL);
        console.log(entries);

    } catch (err) {
        console.log('SQL error', err);
        response.status(500).send('Something went wrong');
    }

});

/**
 *  For testing
 * 
 */

// TODO GET LOAN DETAILS
router.get('/loandetails/:id', function (req, res) {

    var loanID = req.params.id;

    console.log('Loan ID sent is : ', loanID);

    res.send('Sucess Send');
})

/**
 *  Default 404 Page - if no Path Found 
 */
router.get('*', (request, response) => {
    response.render('error');
});


module.exports = router;

