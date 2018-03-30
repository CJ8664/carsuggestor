var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var {
  Client
} = require('pg')
var fs = require('fs');
var spawn = require("child_process").spawn;

const client = new Client({
  user: 'chiragjain',
  host: 'localhost',
  database: 'carsuggest',
  password: '',
  port: 5432,
})

// Handlebar Code
handlebars = handlebars.create({
  defaultLayout: 'main'
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

  // console.log(JSON.stringify(req.body));
  var uuid = (new Date()).getTime();
  var fileName = "inquiry/" + uuid + ".json";
  fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
    if (err) {
      console.log(err);
    } else {
      var process = spawn('python3', ['scripts/process.py', fileName]);
      process.stdout.on('data', function(chunk) {
        var textChunk = chunk.toString('utf8'); // buffer to string
        console.log(textChunk);
      });
    }
  });

  // client.connect()
  //
  // client.query('SELECT review_text from reviews where car_make =\'audi\'', (err, res) => {
  //   console.log(err, res)
  //   client.end()
  //     .then(() => console.log('client has disconnected'))
  //     .catch(err => console.error('error during disconnection', err.stack))
  // })

  res.render('result', {
    car: "BMW"
  });
})
