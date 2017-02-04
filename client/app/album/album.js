angular.module('app.album', ['ngMaterial', "ng", "ngAnimate", "ngAria"])
  .controller('AlbumCtrl', function ($scope, $rootScope, $location, ModalService, Pics, Albums, Collage, Shared, Auth, $window, $mdDialog, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.pageClass = 'page home';
    $rootScope.albums = [];
    $rootScope.albumID = null;
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
        $rootScope.albums = result.map(function(album) {
          album.imagesPath = album.images.map(function(image) {
            return $rootScope.images.find(function(photo) {
              return photo.idimages === image;
            });
          });
          return album;
        });
        console.log('album results', result);
        console.log('root images', $rootScope.images);
        console.log('in God we trust', $rootScope.albums);
        // data = result;
        // $rootScope.albums = result;
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

    $scope.updateAlbumID = function (album) {
      $rootScope.albumID = album;
      console.log('something', $rootScope.albumID);
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
      $location.path('/photosViewer');
    }

    $scope.logoff = Auth.signout;

    $scope.redirectToShared = function() {
      $location.path('/shared');
    }

    $scope.showShared = function () {
      ModalService.showModal({
        templateUrl: 'shareModal.html',
        controller: 'ShareModalCtrl'
      }).then(function (modal) {
        modal.element.modal();
      })
    }
  });
