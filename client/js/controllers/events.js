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
  }]);
