angular.module('app.album', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('AlbumCtrl', function ($scope, $location, Pics, Albums, Collage, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    $scope.images = [];
    var data;

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

    $scope.openMenu = function ($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.fetcher = function() {
      Albums.albumList().then(function(result) {
        console.log('result of creating new album', result);
        data = result;
        $scope.images = result;
      });
    };

    $scope.createAlbum = function(albumInfo) {
      Albums.sendAlbum(albumInfo).then(function(result) {
        console.log('album creation complete');
      });
    };

    $scope.addImage = function(image) {
      Albums.addImgToAlbum(image).then(function(result) {
        console.log('successfully added image to album');
        // refresh and/or redirect to albums page with the newly added image
      });
    };

    $scope.fetcher();

    $scope.settings = function() {
      $location.path('/settings');
    }
  });
