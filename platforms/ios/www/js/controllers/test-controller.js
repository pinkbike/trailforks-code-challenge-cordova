angular.module('starter.controllers')
  .controller('TestController', ['$scope', 'TFTest', function($scope, TFTest) {
    console.log('controller');
    $scope.reports = [];
    $scope.loading = false;
    $scope.trailid = 531935;

    $scope.getReportsByTrail = function () {
      $scope.loading = true;
      TFTest.getReportsByTrail($scope.trailid).then(function (results) {
        if (results) {
          $scope.reports = results;
        }
        $scope.loading = false;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.refresh = function () {
      $scope.getReportsByTrail();
    }

    $scope.$on('$ionicView.loaded', function() {
      $scope.getReportsByTrail();
    });
  }]);
