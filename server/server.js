var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');

var app = express();

require('./routes.js')(app, express);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('Listening on port ', port);
})


module.exports = app;
