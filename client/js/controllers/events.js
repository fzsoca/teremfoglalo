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
  }]).controller('DeleteEventsController', ['$scope', 'Event', '$state',
  '$stateParams', function($scope, Event) {
      Event.deleteById({
         id: $stateParams.id
      }).
        $promise
        .then(function () {
          $state.go('all-events');
        });

}]);
