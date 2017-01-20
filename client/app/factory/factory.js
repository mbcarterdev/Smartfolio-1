angular.module('app.factory' , [])
    .factory('Auth', function ($http) {
        var login = function (user) {
            return $http({
                method: 'POST',
                url: '/signin',
                data: user
                })
                .then(function (resp) {
                  //TODO:  return resp.data.token;
                    window.location.href= '/home'
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
                    window.location.href = '/landing'
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
    })
