var uController = require('./controllers/userController.js');
var iController = require('./controllers/imgController.js');
var multer = require('./config/multer')

module.exports = function (app, express) {
  app.post('/signin', uController.signin);
  app.post('/register', uController.register);
  app.get('/photos', iController.fetch);
  app.post('/upload/photos', multer.upload.fields([{
    name: 'front', maxcount: 1
  }, {name: 'back', maxcount: 1}]), iController.upload);
}
