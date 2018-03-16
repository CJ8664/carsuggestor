var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

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

// Show the form
app.get('/', function (req, res) {
  res.render('index');
})

// Get the result from Database
app.post('/showcar', function (req, res) {
  res.render('index');
})
