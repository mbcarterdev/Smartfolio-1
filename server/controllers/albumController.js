var db = require('../config/db');
var path = require('path');
var fs = require('fs');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums belonging to the user
    var username = req.headers.username;
    var data = [];
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username = '${username}'`)
    .then(function(userInfo) {
      var userID = userInfo[0][0].idusers;
      db.raw(`SELECT * FROM smartfolio.albums WHERE userID = '${userID}'`)
      .then(function(albuminfo) {
        albuminfo[0].forEach(function(album, index) {
          db.raw(`SELECT idimages FROM smartfolio.images INNER JOIN album-image ON album-image.imageID=images.idimages WHERE album-image.albumID=${album.idalbums}`) // need to write a comment here to explain the query string
          .then(function(images) {
            album['images'] = images[0].map(function(imageObj) {
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
    var images = req.body.images;

    db.raw(`SELECT idusers FROM smartfolio.users WHERE username='${username}'`)
    .then(function (result) {
      var userID = result[0][0].idusers;
      db.raw(`INSERT INTO smartfolio.albums values (null, '${albumName}', '${albumDescription}', ${userID})`)
      .then(function() {
        db.raw(`SELECT LAST_INSERT_ID()`)
        .then(function(pKey) {
          if(Array.isArray(images)) {
            images.forEach(function(image, index) {
              db.raw(`INSERT INTO smartfolio.album-image values (null, ${image}, ${pkey})`)
              .then(function() {
                if(index === images.length - 1) {
                  res.sendStatus(200);
                }
              })
            })
          } else {
            res.status(200).send('No images added to album');
          }
        })
      });
    });

  },

  update: function(req, res) {
    // update existing album name/description
    var username = req.headers.username;
    var albumID = req.params.album;
    var newName = req.body.albumName;
    var newDescription = req.body.albumDescription;

    db.raw(`UPDATE smartfolio.albums SET name='${newName}', description='${newDescription}' WHERE idalbums=${albumID}`)
    .then(function() {
      res.sendStatus(202);
    });
  },

  delete: function(req, res) {
    // delete a specified album
    var username = req.headers.username;
    var albumID = req.params.album;

    db.raw(`DELETE FROM smartfolio.albums WHERE idalbums=${albumID}`)
    .then(function() {
      res.sendStatus(200);
    })
  },

  addImgToAlbum: function(req, res) {
    // add an img to an album
  }
};
