angular
  .module('app')
  .controller('AllEventsController', ['$scope', 'Event', 'uiCalendarConfig', function($scope,
                                                                        Event, uiCalendarConfig) {


    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        }

      }
    };
    var eventSource = [];

    var currEvent = {};
    Event.find({
      filter: {
        include: [
          'room',
          'owner',
          'participants'
        ]
      }
    }).$promise
      .then(function (_events) {
        _events.forEach(function (e) {
          currEvent.title = e.name;
          currEvent.start = e.start_date;
          currEvent.end = e.end_date;
          eventSource.push(currEvent);
        });
        $scope.events = _events;
        $scope.eventSources = eventSource;
        uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEvents');
        uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.eventSources);


      });



  }]).controller('CreateEventController', ['$scope', '$stateParams', 'Event', '$state', '$rootScope', function($scope,$stateParams,
                                                                     Event, $state, $rootScope) {
      $scope.submit = function () {
        Event.create({
          name: $scope.event.name,
          start_date: $scope.event.startDate,
          end_date: $scope.event.endDate,
          roomId: $stateParams.roomId,
          ownerId: $rootScope.currentUser.id
        }).
          $promise.
          then(function () {
          $state.go('all-events');
        })
      }
}])
  .controller('JoinEventController', ['$scope', '$stateParams', 'Event',
  '$state', '$rootScope', 'Participation', function($scope,$stateParams,
                                   Event, $state, $rootScope, Participation) {
    Event.participants.link({id: $stateParams.eventId, fk: $rootScope.currentUser.id}).$promise.then(function () {
      alert("Joined group");
    });
}])
  .controller('DeleteEventsController', ['$scope', 'Event',
  '$stateParams', '$state', function($scope, Event, $stateParams, $state) {
      Event.deleteById({
         id: $stateParams.eventId
      }).
        $promise
        .then(function () {
          $state.go('all-events');
        });

}]);
