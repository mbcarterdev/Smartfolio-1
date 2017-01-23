var uController = require('./controllers/userController.js');
var iController = require('./controllers/imgController.js');


module.exports = function (app, express) {
  app.post('/signin', uController.signin);
  app.post('/register', uController.register);
  app.get('/photos', iController.fetch);
  app.post('/upload/photos', iController.upload);
}
