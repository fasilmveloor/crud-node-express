/*
importing the required modules
express is a web framework which we will use for creating our server
body-parser is a middleware which will help us to parse the body of the request
mongoose is a mongodb driver which we will use to connect to our database
 importing required db configs
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const userRoutes = require('./routes/user.js');

const app = express(); // creating an instance of express

/*
adding the body-parser middleware to parse the body of the request
 A middleware is a function that has access to request and response objects. 
 It can execute any code, transform the request object, or return a response.
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



mongoose.Promise = global.Promise;// setting the mongoose promise to global promise
// connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use('/users', userRoutes);
// listening on the port 3000 for incoming connections
app.listen(3000, () => {
    console.log('Server started on port 3000');
});