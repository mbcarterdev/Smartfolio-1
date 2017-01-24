angular.module('app.factory', [])
  .factory('Auth', function ($http, $location, $window) {
    var login = function (user) {
      $http.defaults.headers.common['username'] = user.username
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
      $http.defaults.headers.common['username'] = user.username
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

    var imageFetcher = function (imagename) {
      return $http({
        method: 'GET',
        url: `/photos/${imagename}`
      }).then(function (resp) {
       return(resp.data)
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
  }).factory('AttachTokens', function ($window) {
    var attach = {
      request: function (object) {
      var jwt = $window.localStorage.getItem('com.smartfolio');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
        object.headers['username'] = 'fs@fs.com'
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

