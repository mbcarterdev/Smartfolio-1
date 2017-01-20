var controller = require('./controller.js');


module.exports = function () {
  //have questions if these paths are correct
  app.post('/signin', controller.signin);
  app.post('/register', controller.register);
}
