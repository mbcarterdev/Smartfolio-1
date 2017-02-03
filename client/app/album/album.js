angular.module('app.album', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('AlbumCtrl', function ($scope, $rootScope, $location, Pics, Albums, Collage, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    $scope.albums = [];
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
        console.log('album results', result);
        data = result;
        $scope.albums = result;
      });
    };

    $scope.createAlbumRaw = function(albumInfo) {
      Albums.sendAlbum(albumInfo).then(function(result) {
        console.log('album creation complete');
      });
    };

    $scope.createAlbumFromImageView = function(albumInfo) {
      // need something here so that redirect to /home will also pop up drag-drop for album creation
      $location.path('/home');
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

    $scope.redirectToImageView = function() {
      $location.path('/home')
    }

    $scope.redirectToAlbumsView = function() {
      $location.path('/album')
    }

    $scope.logoff = Auth.signout;
  });
