var db = require('../config/db');
var path = require('path');
var fs = require('fs');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums that has been shared with user
    var username = req.headers.username;
    var data = [];
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username = '${username}'`)
    .then(function(userInfo) {
      var userID = userInfo[0][0].idusers;
      db.raw(`SELECT * FROM smartfolio.shared WHERE shareUserid = '${userID}'`)
      .then(function(sharedinfo) {
        if(sharedinfo[0].length === 0) {
          res.status(404).send(sharedinfo[0]);
        } else {
          sharedinfo[0].forEach(function(shared, index) {
            db.raw(`SELECT * FROM smartfolio.albums WHERE idalbums=${shared.albumid}`) // need to write a comment here to explain the query string
            .then(function(albuminfo) {
              shared['name'] = albuminfo[0][0].name;
              shared['description'] = albuminfo[0][0].description;
              db.raw(`SELECT * FROM smartfolio.album_image WHERE albumID=${albuminfo[0][0].idalbums}`)
              .then(function(imagesObj) {
                var images = imagesObj[0];
                shared['images'] = images.map(function(image) {
                  return image.imageID;
                });
                data.push(shared);
                if(index === sharedinfo[0].length - 1) {
                  res.status(200).send(data);
                }
              })
            })
          })
        }
      })
    })
  },

  getUserId: function(req, res) {
    var username = req.headers.username;
    var shareUser = req.params.shareUser;
    console.log(shareUser);
    console.log(username);

    db.raw(`SELECT * FROM smartfolio.users WHERE username = '${shareUser}'`)
    .then(function(userInfo) {
      if(userInfo[0].length === 0) {
        res.status(404).send('User Not Found');
      } else {
      var userID = userInfo[0][0].idusers;
      res.status(200).send(userID);
      }
    })
  },

  share: function(req, res) {
    // serve up a specific album that the user designates
    var username = req.headers.username;
    var albumID = req.params.album;
    var shareUsers = req.body.shareUsers;

  },

  getSharedList: function(req, res) {
    var username = req.headers.username;
    var albumID = req.params.album;

  },

  remove: function(req, res) {
    var username = req.headers.username;
    var albumID = req.params.album;

  },



  upload: function(req, res) {
    // add a new album
    console.log('req body', req.body);
    var username = req.headers.username;
    var albumName = req.body.albumName;
    var albumDescription = req.body.albumDescription;
    var images = req.body.imageIDs;

    db.raw(`SELECT idusers FROM smartfolio.users WHERE username='${username}'`)
    .then(function (result) {
      var userID = result[0][0].idusers;
      db.raw(`INSERT INTO smartfolio.albums values (null, '${albumName}', '${albumDescription}', ${userID})`)
      .then(function() {
        db.raw(`SELECT MAX(idalbums) FROM smartfolio.albums`)
        .then(function(pKey) {
          var LAST_INSERT_ID = pKey[0][0]['MAX(idalbums)'];
          console.log('inside the array to get images', images);
          if(images) {
            [images].forEach(function(image, index) {
              db.raw(`INSERT INTO smartfolio.album_image values (null, ${image}, ${LAST_INSERT_ID})`)
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
