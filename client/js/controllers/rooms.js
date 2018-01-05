angular
  .module('app')
  .controller('RoomsByBuildingController', ['$scope',
  '$stateParams', 'Room', 'CustomUser' ,function($scope, $stateParams, Room, CustomUser) {

   $scope.rooms = Room.find({filter:{
     where: {
       buildingId: $stateParams.buildingId
     }
   }
    });
  }])
  .controller('StatisticsController', [function () {

  }]);
