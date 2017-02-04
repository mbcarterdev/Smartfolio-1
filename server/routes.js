var uController = require('./controllers/userController.js');
var iController = require('./controllers/imgController.js');
var aController = require('./controllers/albumController.js');
var sController = require('./controllers/sharedController.js');
var helper = require('./authenticator/authenticator');

module.exports = function (app, express) {
  app.post('/signin', uController.signin);
  app.post('/register/', uController.register);

  app.get('/photos', helper.decode, iController.fetch);
  app.post('/upload/photos', helper.decode, iController.upload);
  app.get('/photos/:imgurl', iController.serve);
  app.delete('/photos/:imgurl', helper.decode, iController.delete);

  app.get('/albums', helper.decode, aController.fetch);
  app.get('/albums/:albumurl', aController.serve);
  app.post('/upload/albums', helper.decode, aController.upload);
  app.put('/update/albums', helper.decode, aController.update);
  app.delete('/albums/:albumurl', helper.decode, aController.delete);
  app.put('/albums/:imgurl', helper.decode, aController.addImgToAlbum);

  app.get('/shared/albums', helper.decode, sController.fetch);
  app.get('/shared/:user', helper.decode, sController.getUserId);
  app.get('/shared/list/:albumid', helper.decode, sController.getSharedList);
  app.put('/shared/add', helper.decode, sController.share);
  app.delete('/shared', helper.decode, sController.remove);

  //app.put for changing the front or back img
    //will this go to /photos or /upload/photos?
    //will need a method on iController for updating images
//TODO: add helper.decode to /photos, /upload
  app.use(helper.errorLogger);
  app.use(helper.errorHandler);
}
