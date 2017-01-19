angular.module('app.landing', ['ngMaterial',"ng","ngAnimate","ngAria"])
    .controller('LandCtrl', function ($scope, $location){
        $scope.user = {}
        $scope.login = function () {
            console.log($scope.user)
        }
    })
