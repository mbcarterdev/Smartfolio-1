var db = require('../config/db');
var path = require('path');
var fs = require('fs');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums belonging to the user
    var username = req.headers.username;
    var data = [];
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username = '${username}'`)
    .then(function(userinfo) {
      var userID = userInfo[0][0].idusers;
      db.raw(`SELECT * FROM smartfolio.albums WHERE userID = '${userID}'`)
      .then(function(albuminfo) {
        albuminfo[0].forEach(function(album, index) {
          db.raw(`SELECT idimages FROM smartfolio.images INNER JOIN album-image ON album-image.imageID=images.idimages WHERE album-image.albumID=${album.idalbums}`) // need to write a comment here to explain the query string
          .then(function(images) {
            album['images'] =       images[0].map(function(imageObj) {
              return tagObj.tag;
            });
            data.push(album);

            if(index === albuminfo[0].length - 1) {
              res.status(200).send(data);
            }
          })
        })
      })
    })
  },

  serve: function(req, res) {
    // serve up a specific album that the user designates
  },

  upload: function(req, res) {
    // add a new album
    var username = req.headers.username;
    var albumName = req.body.albumName;
    var albumDescription = req.body.albumDescription;

    db.raw(`SELECT idusers FROM smartfolio.users WHERE username='${username}'`)
    .then(function (result) {
      var userID = results[0][0].idusers;
      db.raw(`INSERT INTO smartfolio.albums values (null, '${albumName}', '${albumDescription}', ${userID})`)
      .then(function() {
        res.sendStatus(201);
      });
    });

  },

  update: function(req, res) {
    // add photo(s) to existing album
  },

  delete: function(req, res) {
    // delete a specified album
  },

  addImgToAlbum: function(req, res) {
    // add an img to an album
  }
};
