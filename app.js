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

client.connect();

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
              fs.readFile("inquiry/" + uuid + "_result.json", function(err, cars) {
                if (err) {
                  console.log(err);
                } else {
                  // Get the reviews from the database for that car
                  cars = JSON.parse(cars);
                  console.log(cars);

                  var final_result = [];
                  function sleep(time) {
                    return new Promise((resolve) => setTimeout(resolve, time));
                  }
                  cars.forEach(function(car_name) {
                      var car = car_name.split('_')
                      var carMake = car[0]
                      var carModel = car[1]
                      // data = 'audi'
                      var positiveQry = "SELECT review_text from reviews where car_make = '" +
                        carMake + "' and car_model = '" + carModel + "' order by review_polarity desc LIMIT 3"
                      var negativeQry = "SELECT review_text from reviews where car_make = '" +
                        carMake + "' and car_model = '" + carModel + "' order by review_polarity LIMIT 3"

                      var posReviews = [];
                      var negReviews = [];

                      var posQryDone = false;

                      client.query(positiveQry, (err, result) => {
                        result.rows.forEach(function(value) {
                          posReviews.push(value.review_text);
                          console.log(value.review_text);
                        });
                      })
                      client.query(negativeQry, (err, result) => {
                        result.rows.forEach(function(value) {
                          negReviews.push(value.review_text);
                        });
                      })
                      sleep(5000).then(() => {
                        final_result.push({
                          'car': car_name,
                          'positive': posReviews,
                          'negative': negReviews
                        })
                        // console.log(final_result);
                        // Render the result
                        res.render('result', {
                          cars: final_result
                        });
                      });
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
