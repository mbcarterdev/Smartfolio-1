var db = require('./../config/db');
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res) {
    db.raw(`SELECT username, password from users where username = '${req.body.username}'`)
      .then(function (result) {
        if (result[0][0]) {
          console.log(result[0][0])
          if (result[0][0].password === req.body.password) {
            res.status(200).send();
          } else {
            res.status(401).send('Incorrect Password')
          }
        } else {
          res.status(400).send('User does not exist. Please Register.')
        }
      })
  },

  register: function (req, res) {
   db.raw(`SELECT username from users where username = '${req.body.username}'`)
      .then(function (results) {
        if (!!results[0][0]) {
          res.status(401).send('user already exist')
        } else {
            db.raw(`INSERT INTO USERS VALUES (NULL, '${req.body.username}', '${req.body.password}')`)
              .then(function (results) {
                res.status(200).send()
              })
          }

        })

  }
}
