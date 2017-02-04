angular.module('app.shared', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('SharedCtrl', function ($scope, $rootScope, $location, ModalService, Pics, Shared, Albums, Collage, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    $rootScope.sharedAlbums = [];
    $rootScope.sharedAlbumID = null;
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
      Shared.fetcher()
      .then(function(results) {
        $rootScope.sharedAlbums = results;
        console.log(results);
      })
      //
      //
      // Albums.albumList().then(function(result) {
      //   $rootScope.albums = result.map(function(album) {
      //     album.imagesPath = album.images.map(function(image) {
      //       return $rootScope.images.find(function(photo) {
      //         return photo.idimages === image;
      //       });
      //     });
      //     return album;
      //
      //   });
        // console.log('album results', results);
      //   console.log('root images', $rootScope.images);
      //   console.log('in God we trust', $rootScope.albums);
      //   data = result;
      //   $rootScope.albums = result;
      // });
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

    $scope.updateAlbumID = function (album) {
      $rootScope.sharedAlbumID = album;
      console.log('something', $rootScope.sharedAlbumID);
    }

    $scope.show2 = function () { //show the uplaod file modal
      ModalService.showModal({
        templateUrl: 'uploader.html',
        controller: "UploadCtrl"
      }).then(function (modal) {
        modal.element.modal();
      });
    };

    $scope.settings = function() {
      $location.path('/settings');
    }

    $scope.redirectToImageView = function() {
      $location.path('/home');
    }

    $scope.redirectToAlbumsView = function() {
      $location.path('/album');
    }

    $scope.redirectToAlbumViewerView = function() {
      $location.path('/sharedViewer');
    }

    $scope.redirectToShared = function() {
      $location.path('/shared');
    }

    $scope.logoff = Auth.signout;

    $scope.close = function () {
      $mdDialog.hide();
    };

  });
