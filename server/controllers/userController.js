var db = require('./../config/db');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res) {
    db.raw(`SELECT username, password from users where username = '${req.body.username}'`)
      .then(function (result) {
        if (result[0][0]) {
          bcrypt.compare(req.body.password, result[0][0].password, function (err, result) {
            console.log(err, result)
            if (err) {
              console.log('Error comparing hashed passwords')
            }
            if (result) {
              res.status(200).send();
            } else {
              res.status(401).send('Incorrect Password')
            }

          } )
        } else {
          res.status(400).send('User does not exist. Please Register.')
        }
      })
  },

  register: function (req, res) {
    // console.log(req.body)
   db.raw(`SELECT username from users where username = '${req.body.username}'`)
      .then(function (results) {

        if (!!results[0][0]) {
          res.status(401).send('user already exist')
        } else {

          bcrypt.hash(req.body.password, null, null, function (err, hash) {
            if(err) {
              return console.log('Error hashing ' + err);
            }
            console.log('here', results)
            db.raw(`INSERT INTO USERS VALUES (NULL, '${req.body.username}', '${hash}')`)
              .then(function (results) {
                res.status(200).send()
              })
          })

          }

        })

  }
}
