var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var {
  Client
} = require('pg')
var fs = require('fs');
var spawn = require("child_process").spawn;
var session = require('express-session');
const delay = require('delay');

const client = new Client({
  user: 'chiragjain',
  host: 'localhost',
  database: 'carsuggest',
  password: '',
  port: 5432,
})

// Handlebar Code
handlebars = handlebars.create({
	defaultLayout: 'main',
	helpers: {
		select: function(selected, options) {
		    return options.fn(this).replace(
		            new RegExp(' value=\"' + selected + '\"'),
		            '$& selected="selected"');
		    }
	}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// App configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Body parser code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Session related for tracking logins
app.use(session({
  secret: 'CARS',
  resave: true,
  saveUninitialized: false
}));

// Start the server
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

// Show the form
app.get('/', function(req, res) {
  res.render('index');
})

// Get the result from Database
app.post('/showcar', function(req, res) {

  // Get a unique identifier for each form input data
  var uuid = (new Date()).getTime();
  req.session.uuid = uuid;
  var fileName = "inquiry/" + uuid + ".json";

  // Write a file containing the input from user
  fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
    if (err) {
      console.log(err);
    } else {
      // If data successfully written, call the python script to process the
      // input
      var process = spawn('python3', ['scripts/process.py', fileName]);
      process.stdout.on('data', function(chunk) {
        var execStatus = chunk.toString('utf8');
        if (execStatus.startsWith('SUCCESS')) {
          // Read the result that will be stored in _result file
          fs.readFile("inquiry/" + uuid + "_result.json", function(err, data) {
            if (err) {
              console.log(err);
            } else {
              // Get the reviews from the database for that car

              var positiveQry = "SELECT review_text from reviews where car_make = '" +
                data + "' order by review_polarity desc LIMIT 10"
              var negativeQry = "SELECT review_text from reviews where car_make = '" +
                data + "' order by review_polarity LIMIT 10"

              var posReviews = [];
              var negReviews = [];

              var posQryDone = false;

              client.connect();

              client.query(positiveQry, (err, result) => {
                result.rows.forEach(function(value) {
                  posReviews.push(value.review_text);
                });
              })
              client.query(negativeQry, (err, result) => {
                result.rows.forEach(function(value) {
                  negReviews.push(value.review_text);
                });
              })

              function sleep(time) {
                return new Promise((resolve) => setTimeout(resolve, time));
              }

              sleep(3000).then(() => {
                // Render the result
                res.render('result', {
                  car: data,
                  positive: posReviews,
                  negative: negReviews
                });
                client.end();
              })
            }
          });
        }
      });
    }
  });
})

// Save the result
app.post('/save', function(req, res) {
  if (req.body.happy == 'yes') {
    fs.rename("inquiry/" + req.session.uuid + ".json", "correct/" +
      req.session.uuid + ".json");
    fs.rename("inquiry/" + req.session.uuid + "_result.json", "correct/" +
      req.session.uuid + "_result.json");
  } else {
    fs.rename("inquiry/" + req.session.uuid + ".json", "incorrect/" +
      req.session.uuid + ".json");
    fs.rename("inquiry/" + req.session.uuid + "_result.json", "incorrect/" +
      req.session.uuid + "_result.json");
  }
  res.render('thankyou');
})
