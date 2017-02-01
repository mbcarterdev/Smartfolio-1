angular.module('app.album', ['ngMaterial', "ng", "ngAnimate", "ngAria", "Pics", "Albums"])
  .controller('AlbumCtrl', function ($scope, $rootScope) {
    $rootScope.back = ""
  });
