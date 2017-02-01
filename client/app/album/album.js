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
    }

    $scope.fetcher = function() {
      Albums.albumList().then(function(result) {
        data = result;
        $scope.images = result;
      })
    }





    $scope.settings = function() {
      $location.path('/settings');
    }
  });
