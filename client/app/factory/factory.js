angular.module('app.factory', [])
  .factory('Auth', function ($http, $location) {
    var login = function (user) {
      console.log(user);
      return $http({
        method: 'POST',
        url: '/signin',
        data: user
      })
        .then(function (resp) {
          //TODO:  return resp.data.token;
          $location.path('/home');
          //window.location.href= '/home'
        });
    };
    var register = function (user) {
      return $http({
        method: 'POST',
        url: '/register',
        data: user
      })
        .then(function (resp) {
          //TODO:  return resp.data.token;
          $location.path('/home');
          // window.location.href = '/landing'
        });
    };

    var isAuth = function () {
      return !!window.localStorage.getItem('com.smartfolio');
    }
    return {
      login,
      isAuth,
      register
    };
  })
  .factory('Pics', function ($http) {
    var sendPhotos = function (files) {
      return $http({
        method: 'POST',
        url: '/upload/photos',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: files
      }).then(function (resp) {
        console.log('done')
      })
    }

    return ({
      sendPhotos
    })
  })
  .factory('Collage', function () {
    var imageObj
    return ({
      get: function () {
        return imageObj
      },
      set: function (img) {
        imageObj = img;
      }
    })
  })
