angular
  .module('app')
  .controller('RoomsByBuildingController', ['$scope',
  '$stateParams', 'Room', function($scope, $stateParams, Room) {
   $scope.rooms = Room.find({filter:{
     where: {
       buildingid: $stateParams.id
     }
   }
    });
  }]);
