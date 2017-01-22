var controller = require('./controllers/controller.js');


module.exports = function (app, express) {
  //have questions if these paths are correct
  app.post('/signin', controller.signin);
  app.post('/register', controller.register);
}
