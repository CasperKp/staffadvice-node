const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

//mongoose.connect('mongodb://localhost/staffadvice');
mongoose.connect('mongodb://CasperKp:assjack66@ds145183.mlab.com:45183/staffadvice-nodejs');
let db = mongoose.connection;

// Init app
const app = express();

// Bring in models
let Jobboard = require('./models/jobboard');

// Set Public folder - makes static files work (img, javascript and stylesheets)
app.use('/static', express.static('public'));

var ifCondHelperFunction = function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
};

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        ifCond: ifCondHelperFunction
    },
    defaultLayout: 'layout'
});

// Make Handlebars work
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



var positionTypes = [
  {
    name: 'Full Time',
    value: 'full-time'
  },
  {
    name: 'Part Time',
    value: 'part-time'
  }
];



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

/*
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
*/


app.get('/jobboards', function(req, res) {
  var jobfunction = (req.query.jobfunction);
  var jobposition = (req.query.jobposition);
  var country = (req.query.country);
  var repostingisfree = (req.query.repostingisfree);
  if (req.query.jobfunction || req.query.jobposition || req.query.country || req.query.repostingisfree) {
    Jobboard.find({jobfunction:jobfunction, jobposition:jobposition, country:country, repostingisfree:repostingisfree}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  } else {
    Jobboard.find({}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  }
});





/*
app.get('/jobboards', function(req, res) {
  var jobfunction = (req.query.jobfunction);
  var jobposition = (req.query.jobposition);
  var country = (req.query.country);
  var repostingisfree = (req.query.repostingisfree);
  var page = req.query.page;
  if (typeof page == 'undefined' || page == 0) {
    page = 1
  }
  if ( req.query.jobfunction || req.query.jobposition || req.query.country || req.query.repostingisfree) {
    var dbquery = Jobboard
      .find({jobfunction:jobfunction, jobposition:jobposition, country:country, repostingisfree:repostingisfree})
      .skip(page * 2)
      .limit(2);

      dbquery.exec(function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards,
          jobposition: req.query.jobposition,
          positionTypes: positionTypes
        });
      }
    });
  } else {
    var query = Jobboard.find({})
      .skip((page-1)*2)
      .limit(2)
    query.exec(function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards,
          jobposition: req.query.jobposition,
          positionTypes: positionTypes
        });
      }
    });
  }
});
*/







/*
app.get('/jobboards', function(req, res) {
  var jobtype = (req.query.jobtype);
  var jobposition = (req.query.jobposition);
  var country = (req.query.country);
  var repostingisfree = (req.query.repostingisfree);
  Jobboard.find({jobtype:jobtype, jobposition:jobposition, country:country, repostingisfree:repostingisfree}, function(err, jobboards){
    if(err){
      console.log(err);
    } else {
      res.render('jobboards/index', {
        jobboards : jobboards
     });
    }
  });
});
*/

/*app.get('/jobboards', function(req, res) {
  var nameQuery = (req.query.name);
  Jobboard.where('name').equals('nameQuery').exec(function(err, jobboards){
    if(err){
      console.log(err);
    } else {
      res.render('jobboards/index', {
        jobboards : jobboards
     });
    }
  });
});
*/

/*
app.get('/jobboards', function(req, res) {
  var name = (req.query.name);
  var product = (req.query.product);
  if (req.query.name && req.query.product) {
    Jobboard.find({name:name, product:product}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  } else {
    Jobboard.find({}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  }
});
*/


/*app.get('/jobboards', function(req, res){
  var name = (req.query.name);
  var product = (req.query.product);
  //var sortName = { product: 1};
  Jobboard.find({name:name, product:product}, function(err, jobboards){
    if(err){
      console.log(err);
    } else {
    res.render('jobboards/index', {
      jobboards:jobboards
    });
    }
  });
});
*/

/*
app.get('/jobboards', function(req, res){
  var product = (req.query.product);
  var sortName = { product: 1};
  Jobboard.find({}).where('product').equals(product).sort(sortName).limit(2).exec(function(err, jobboards){
    if(err){
      console.log(err);
    } else {
    res.render('jobboards/index', {
      jobboards:jobboards
    });
    }
  });
});
*/




/*app.get('/jobboards', function(req, res) {
  var name = (req.query.name);
  var product = (req.query.product);
  var search = [name, product]
  if (req.query.name && req.query.product) {
    Jobboard.find({search}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  } else {
    Jobboard.find({}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  }
});
*/


/* app.get('/jobboards', function(req, res) {
  //var name = (req.query.name);
  var product = (req.query.product);
  if (req.query.product) {
    Jobboard.find({product}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  } else {
    Jobboard.find({}, function(err, jobboards){
      if(err){
        console.log(err);
      } else {
        res.render('jobboards/index', {
          jobboards : jobboards
        });
      }
    });
  }
});
*/




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
