angular.module('app.home', ['ngMaterial',"ng","ngAnimate","ngAria",'angularModalService'])
    .controller('HomeCtrl', function ($scope, $mdSidenav, ModalService, Collage) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        }

        $scope.images = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Kurau_Phantom_Memory.jpg/230px-Kurau_Phantom_Memory.jpg',
    'https://upload.wikimedia.org/wikipedia/en/a/a6/Kanon_second_anime_Funimation_box_set.jpg',
    'https://upload.wikimedia.org/wikipedia/en/7/79/Please_Teacher_Vol_1_DVD.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_(1988_poster).jpg',
    'http://vignette2.wikia.nocookie.net/doblaje/images/9/98/Love_hina.jpg/revision/latest?cb=20101128193919&path-prefix=es',
    'https://s-media-cache-ak0.pinimg.com/originals/c0/1f/82/c01f82029206714ff7f2aeab24254e73.jpg',
    'http://img1.ak.crunchyroll.com/i/spire4/30eb07003c901066a9db027399c77ad41420598162_full.jpg',
    'https://upload.wikimedia.org/wikipedia/en/f/fe/FLCL_image.jpg',
    'https://myanimelist.cdn-dena.com/images/anime/9/20134.jpg',
    'http://static.tvtropes.org/pmwiki/pub/images/rsz_capa.jpg'
]

        $scope.show = function(index) {
            console.log(index)
            Collage.set({image1: $scope.images[index],
                image2: $scope.images[index+1]
            })
            ModalService.showModal({
                templateUrl: 'modal.html',
                controller: "ModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.show2 = function(index) {
            ModalService.showModal({
                templateUrl: 'uploader.html',
                controller: "UploadCtrl"
            }).then(function(modal) {
                modal.element.modal();

            });
        };

    });




