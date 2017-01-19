angular.module('app', ['app.landing',
    'app.home',
    'app.album',
    'app.settings',
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
    });
