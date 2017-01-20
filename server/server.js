var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('Listening on port ', port);
})


module.exports = app;
