var db = require('../config/db');
var path = require('path');
var fs = require('fs');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums belonging to the user
  },

  serve: function(req, res) {
    // serve up a specific album that the user designates
  },

  upload: function(req, res) {
    // add a new album (empty or full)
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
