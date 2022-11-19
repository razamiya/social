// Require All Module
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoDBconnect = require('./config/db');
const UserRouter = require('./routes/userRoute');
const localMiddleware = require('./middleware/localMiddleware');


// Init Express 
const app = express();


// Middleware Init 
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookie_parser());



// Invarenment Variable 
const PORT = process.env.PORT || 4000;


// Express static folder
app.use(express.static('public'));


// Init Express session
app.use(session({
    secret : 'We Love MERN',
    saveUninitialized : true,
    resave : false
}))

app.use(localMiddleware);


// Ejs Init 
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/app' );


// Route 
app.use( UserRouter )


// Listen App 
app.listen(PORT, () => {
    mongoDBconnect();
    console.log(`Your server is running on port ${PORT}`.bgMagenta.black);
});