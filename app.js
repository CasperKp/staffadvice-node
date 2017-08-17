const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/staffadvice');
mongoose.connect('mongodb://CasperKp:assjack66@ds145183.mlab.com:45183/staffadvice-nodejs');
let db = mongoose.connection;

// Init app
const app = express();

// Bring in models
let Jobboard = require('./models/jobboard');

// Set Public folder - makes static files work (img, javascript and stylesheets)
app.use('/static', express.static('public'));

// Make Handlebars work
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');



/* ----------

Routes

---------- */

// Home page
app.get('/', function(req, res) {
  res.render('pages/home', {
    title: "| Compare job boards"
  });
});


// About page
app.get('/about', function(req, res) {
  res.render('pages/about', {
    title: "| About page"
  });
});


// Jobboards index page
app.get('/jobboards', function(req, res) {
  Jobboard.find({}, function(err, jobboards){
    if(err){
      console.log(err);
    } else {
      res.render('jobboards/index', {
        jobboards : jobboards
     });
    }
  });
});


// Jobboards show page
app.get('/jobboards/:slug', function(req, res) {
  Jobboard.findOne({slug:req.params.slug}, function(err, jobboard){
    res.render('jobboards/show', {
      jobboard : jobboard
    });
  });
});


// 404 error page
app.use(function (req, res, next) {
  res.status(404).render('errors/404');
});


// Listen on port 3000 - in development and production
app.listen(process.env.PORT || 3000, function() {
  console.log("The application is running on localhost:3000");
});
