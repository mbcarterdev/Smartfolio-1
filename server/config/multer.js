var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/pheon/Desktop/Smartfolio-1/server/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

exports.upload =  multer({ storage: storage })