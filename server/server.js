var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');


var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, '/Users/pheon/Desktop/Smartfolio-1/server/uploads')
  },
  filename: function (req, file, cb){

    cb(null, file.originalname)
  }
})


var upload = multer({storage: storage}).fields([{
  name: 'front', maxcount: 1
}, {name: 'back', maxcount: 1}]);




app.use(bodyParser.json());
app.use(upload)

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../client')));

require('./routes.js')(app, express);
var port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log('Listening on port ', port);
})


module.exports = app;
