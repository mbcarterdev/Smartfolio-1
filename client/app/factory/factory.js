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
          return resp.data.token;
        });
    };
    var register = function (user) {
      return $http({
        method: 'POST',
        url: '/register',
        data: user
      })
        .then(function (resp) {
          return resp.data.token;
        });
    };

    var isAuth = function () {
      return !!window.localStorage.getItem('com.smartfolio');
    }

    var signout = function () {
      $window.localSotrage.removeItem('com.smartfolio');
    }
    return {
      login,
      isAuth,
      register,
      signout
    };
  })
  .factory('Collage', function () {
    var imgObj = {};
    var set = function (img) {
      imgObj = img;
    };
    var get = function () {
      return imgObj
    };

    return ({
      set,
      get
    })
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
        transformRequest : angular.identity
      }).then(function (resp) {
        console.log('done')
      })
    }

    return ({
      sendPhotos
    })
  }).factory('AttachTokens', function ($window) {
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.smartfolio)');
        if(jet) {
          object.header['x-access-token'] = jwt;
        }
        object.header['Allow-Control-Allow-Origin'] = '*';
        return object;
  }
  };
    return attach;
})

