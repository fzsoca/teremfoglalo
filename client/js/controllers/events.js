angular
  .module('app')
  .controller('AllEventsController', ['$scope', 'Event', function($scope,
                                                                        Event) {
    $scope.events = Event.find({
      filter: {
        include: [
          'room'
        ]
      }
    });
  }]).controller('CreateEventController', ['$scope', '$stateParams', 'Event', '$state', function($scope,$stateParams,
                                                                     Event, $state) {
      $scope.submit = function () {
        Event.create({
          name: $scope.event.name,
          start_date: $scope.event.startDate,
          end_date: $scope.event.endDate,
          roomId: $stateParams.roomId
        }).
          $promise.
          then(function () {
          $state.go('all-events');
        })
      }
}])
  .controller('DeleteEventsController', ['$scope', 'Event',
  '$stateParams', '$state', function($scope, Event, $stateParams, $state) {
    console.log("inside deleteeventcontroller");
    console.log($stateParams.id);
      Event.deleteById({
         id: $stateParams.eventId
      }).
        $promise
        .then(function () {
          $state.go('all-events');
        });

}]);
