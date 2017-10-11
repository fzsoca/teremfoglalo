angular
  .module('app')
  .controller('AllBuildingsController', ['$scope', 'Building', function($scope,
                                                                    Building) {
    $scope.buildings = Building.find();
  }]);

