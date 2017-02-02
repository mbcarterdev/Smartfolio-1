angular.module('app.factory', [])
  .factory('Auth', function ($http, $location, $window) {
    var login = function (user) { //function to login
      return $http({
          method: 'POST',
          url: '/signin',
          data: user
        })
        .then(function (resp) {
          return resp.data;
        });
    };
    var register = function (user) { //function to register first time users
      return $http({
          method: 'POST',
          url: '/register',
          data: user
        })
        .then(function (resp) {
          return resp.data;
        });
    };

    var isAuth = function () { //fetching the token from local storage and checking if it exisits
      return !!$window.localStorage.getItem('com.smartfolio');
    }

    var signout = function () {
      $window.localStorage.removeItem('com.smartfolio');
      $location.path('/')
    }
    return {
      login,
      isAuth,
      register,
      signout
    };
  })
   .factory('Pics', function ($http) {
    var sendPhotos = function (files) {
      return $http({ //send pictures server
        method: 'POST',
        url: '/upload/photos',
        headers: {
          'Content-Type': undefined //undefined or else gives body parse error
        },
        data: files,
        transformRequest: angular.identity
      }).then(function (resp) {
        console.log('done sending pictures');
      })
    }

    var imageFetcher = function (imagename) {
      return $http({
        method: 'GET',
        url: `/photos/${imagename}` //imagename is the url paramter to fetch the right image from server
      }).then(function (resp) {
        return (resp.data)
      })
    };

    var imageList = function () {
      return $http({
        method: 'GET',
        url: '/photos'
      }).then(function (resp) {
        return resp.data;
      })
    };

    var imageDeleter = function(imghash) {
      return $http({
        method: 'DELETE',
        url: `/photos/${imghash}`
      }).then(function (resp) {
        return (resp.data);
      })
    };

    return ({
      sendPhotos,
      imageFetcher,
      imageList,
      imageDeleter
    })
  })
  .factory('Albums', function($http) {
    var albumList = function() {
      return $http({
        method: 'GET',
        url: `/albums`
      }).then(function(resp) {
        return resp.data;
      });
    };

    var albumFetcher = function(albumName) {
      return $http({
        method: 'GET',
        url: `/albums/${albumName}`
      }).then(function(resp) {
        return resp.data;
      });
    };

    var sendAlbum = function(albums) {
      return $http({
        method: 'POST',
        url: '/upload/albums',
        headers: {
          'Content-Type': 'application/json'
        },
        data: albums.album
      }).then(function(resp) {
        console.log('album creation complete');
        return resp.data;
      });
    };

    var updateAlbum = function(album) {
      return $http({
        method: 'PUT',
        url: '/update/albums',
        params: {
          album: album.idalbums
        },
        data: album,
        transformRequest: angular.identity
      }).then(function(resp) {
        console.log('successfully updated album');
      });
    };

    var deleteAlbum = function(album) {
      return $http({
        method: 'DELETE',
        url: `/albums/${album}`
      }).then(function(resp) {
        console.log('successfully deleted album');
        return resp.data;
      })
    };

    var addImgToAlbum = function(imageName) {
      return $http({
        method: 'PUT',
        url: `/albums/${imageName}`,
        params: {
          image: imageName
        },
        data: imageName
      }).then(function(resp) {
        return resp.data;
      });
    };

    return ({
      albumList,
      albumFetcher,
      sendAlbum,
      updateAlbum,
      deleteAlbum,
      addImgToAlbum
    })
  })
  .factory('Collage', function () {
    var imgObj = {};
    var fetch;
    var set = function (img) {
      imgObj = img;
    };
    var get = function () {
      return imgObj;
    };

    var setFetcher = function (func) {
      fetch = func;
    }

    var getFetcher = function () {
      return fetch;
    }

    return ({
      set,
      get,
      setFetcher,
      getFetcher
    })
  })
  .factory('AttachTokens', function ($window) {
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.smartfolio');
        var username = $window.localStorage.getItem('username');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
          object.headers['username'] = username;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
