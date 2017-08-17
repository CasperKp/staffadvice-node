const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Init app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');



/* ----------

Routes

---------- */

// Home page
app.get('/', function(req, res) {
  res.render('pages/home');
});

// About page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The application is running on localhost:3000");
});
