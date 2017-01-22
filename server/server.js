var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');

var app = express();



app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../client')));

require('./routes.js')(app, express);
var port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log('Listening on port ', port);
})


module.exports = app;
