var watson = require('watson-developer-cloud');
var fs = require('fs');
var db = require('../config/db');
var path = require('path')

var visual_recognition = watson.visual_recognition({
  api_key: '790f804248571cb7af13e9260d0d47df019b4498',
  version: 'v3',
  version_date: '2016-05-20'
});


db.raw(`SELECT images.idimages FROM images join tags on tags.idimages where images.idimages != tags.idimages`)
  .then(function (results) {
    results[0].forEach(function (imgid) {
      db.raw(`SELECT imghash from images where idimages  = ${imgid.idimages}`)
        .then(function (imgResult) {
          var imgName = imgResult[0][0].imghash;
          var params = {
            images_file: fs.createReadStream(`../uploads/${imgName}`)
          };

          visual_recognition.detectFaces(params, function (err, res) {
            if (err) {
              console.log(err);
            } else {
              res.images[0].faces.forEach( function(face) {
                var age;
                if(face.age.max) {
                 age = `age\: ${face.age.min} - ${face.age.max}`;
                } else {
                  age = `age\: around ${face.age.min}`;
                }
                db.raw(`INSERT INTO tags values (null, ${imgid.idimages} ,'${age}')`)
                .then(function () {
                  db.raw(`INSERT INTO tags values (null, ${imgid.idimages} ,'${face.gender.gender}')`)
                })
              })

              // visual_recognition.classify(params, function (err, res) {
              //   if (err)
              //     console.log(err);
              //   else
              //     console.log(JSON.stringify(res, null, 2));
              // });
            }
              
         });
        });
    });
  })

// var params = {
//   images_file: fs.createReadStream('../uploads/michelle@michelle.com download-free-coreldraw-tutorials-vector-design.png')
// };

// visual_recognition.detectFaces(params,
//   function(err, response) {
//     if (err)
//       console.log(err);
//     else
//       console.log(typeof response);
//       console.log(JSON.stringify(response,null,2));
//   });