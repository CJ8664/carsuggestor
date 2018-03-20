var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var {
  Client
} = require('pg')

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

// Start the server
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

client.connect()

// Show the form
app.get('/', function(req, res) {
  res.render('index');
})

// Get the result from Database
app.post('/showcar', function(req, res) {

  // client.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res)
  //   client.end()
  // })
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['scripts/process.py', 'Chirag']);

  process.stdout.on('data', function(chunk) {

    var textChunk = chunk.toString('utf8'); // buffer to string
    console.log(textChunk);

  });

  res.render('result', {
    car: "BMW"
  });
})

// client.end()
//   .then(() => console.log('client has disconnected'))
//   .catch(err => console.error('error during disconnection', err.stack))
