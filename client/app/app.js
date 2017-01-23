angular.module('app', ['app.landing',
    'app.factory',
    'app.home',
    'app.album',
    'app.settings',
    'ui.grid',
    'angularModalService',
    'ngRoute'])
    .config(function ($routeProvider, $httpProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: '/app/landing/landing.html',
                controller: 'LandCtrl'
            })
            .when('/home',{
                templateUrl: '/app/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/settings', {
                templateUrl: '/app/settings/settings.html',
                controller: 'SettingsCtrl'
            })
            .when('/album',{
                templateUrl: '/app/album/album.html',
                controller: 'AlbumCtrl'
            })
    }).controller('ModalController', function($scope, close, Collage ) {
    $scope.url= Collage.get();
    $scope.close = function(result) {
        close(result, 500);
    };

}).controller('UploadCtrl', function ($scope, close, Pics) {
    var fd = new FormData();
    $scope.uploadFile = function(fileType, files){
      fd.append(fileType, files[0])
    }
    $scope.con = function () {
        Pics.sendPhotos(fd)
    }
})
