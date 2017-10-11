angular
  .module('app')
  .controller('AllBuildingsController', ['$scope', 'building', function($scope,
                                                                    building) {
    $scope.buildings = building.find();
  }]);

