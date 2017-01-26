angular.module('app.factory', [])
  .factory('Auth', function ($http, $location, $window) {
    var login = function (user) {
      return $http({
          method: 'POST',
          url: '/signin',
          data: user
        })
        .then(function (resp) {
          return resp.data;
        });
    };
    var register = function (user) {
      return $http({
          method: 'POST',
          url: '/register',
          data: user
        })
        .then(function (resp) {
          return resp.data;
        });
    };

    var isAuth = function () {
      console.log($window.localStorage.getItem('com.smartfolio'))
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
      return $http({
        method: 'POST',
        url: '/upload/photos',
        headers: {
          'Content-Type': undefined
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
        url: `/photos/${imagename}`
      }).then(function (resp) {
        return (resp.data)
      })
    };

    var imageList = function () {

      return $http({
        method: 'GET',
        url: '/photos'
      }).then(function (res) {
        console.log(res)
        return res.data;
      })
    };

    return ({
      sendPhotos,
      imageFetcher,
      imageList,
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