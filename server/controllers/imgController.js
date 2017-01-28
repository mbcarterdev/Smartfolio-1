var db = require('./../config/db');
var path = require('path');

module.exports = {
  fetch: function (req, res) {
    var username = req.headers.username;
    var data = []
    db.raw(`select idusers from smartfolio.users where username = '${username}'`) //get userID of the signed in user
      .then(function (userInfo) {
        var userID = userInfo[0][0].idusers;
        db.raw(`SELECT * FROM smartfolio.images WHERE userid = ${userID}`)  //get all the images name, location and id for the current users
          .then(function (imageInfo) {
            imageInfo[0].forEach(function (image, index) {
              db.raw(`SELECT tag from smartfolio.tags where idimages = ${image.idimages}`) //get the tags of each image for the user
                .then(function (tags) {
                  image['tags'] = tags[0].map(function (tagObj) {   //convert those tags into an array of string
                    return tagObj.tag;
                  });
                  data.push(image) //push the newly created image result object with tags property
                  if (index === imageInfo[0].length - 1) {
                    res.status(200).send(data)   //send the user all the images info with tags
                  }
                });
            });
          });
      });
  },
  upload: function (req, res) {
    var username = req.headers.username;
    var front = req.files.front[0].originalname;
    var back = req.files.back[0].originalname
    console.log(front)
    db.raw(`select idusers from smartfolio.users where username = '${username}'`)
      .then(function (results) {
        var userID = results[0][0].idusers;
        db.raw(`INSERT INTO smartfolio.images values (null, '${front}', '${`${username} ${front}`}',
        null, null, '${back}', '${`${username} ${back}`}', ${userID} )`).then(function () {

            res.sendStatus(200)
          })
      })
  },

  serve: function (req, res) {
    var location = path.join(__dirname, '../uploads')

    var imgUser = req.params.imgurl.split(' ')[0];

    var imgname = req.params.imgurl;
    // if(imgUser === req.headers.username) {
    res.sendFile(`${location}/${imgname}`)
    //} else {
    // res.status(401).send('Not Allowed');
    //}
  },
  delete: function (req, res) {
    var imghash = req.body.imghash;
    var data = []
    db.raw(`DELETE from smartfolio.images where imghash =  '${imghash}'`) //then delete the tags for that imghash
      .then(function () {
        db.raw(`DELETE from smartfolio.tags where idimages = ${image.idimages}`)//check w/ RJ on this
        .then(function() {
          res.sendStatus(200)
        })
      })
  }
};
