angular
  .module('app')
  .controller('AllEventsController', ['$scope', '$state', 'Event', 'uiCalendarConfig', function($scope,$state,
                                                                        Event, uiCalendarConfig) {
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function (calEvent, jsEvent, view) {
          $state.go('event-details', {eventId: calEvent.id});
        }

      }
    };
    var eventSource = [];

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

          eventSource.push({id: e.id, title: e.name, start: e.start_date, end: e.end_date });
        });

        $scope.eventSources = eventSource;
      //  console.log($scope.eventSources);
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
  .controller('EventDetailsController', ['$scope', '$stateParams', 'Event', '$state', '$rootScope', function($scope,$stateParams,
                                                                                                            Event, $state, $rootScope) {
   Event.findById({
      id: $stateParams.eventId,
      filter: {include: ['owner', 'participants']}
    }).$promise.
    then(function (event) {
     $scope.event = event;
    $scope.participants = Event.participants({id: $stateParams.eventId});
   });


  }])
  .controller('MyEventsController', ['$scope', '$stateParams', 'Event', '$state', '$rootScope', function($scope,$stateParams,
                                                                                                             Event, $state, $rootScope) {
    $scope.events = Event.find({
      filter: {where: {ownerId: $rootScope.currentUser.id}}
    });


  }])
  .controller('InviteUsersController', ['$scope', '$stateParams', 'Event', 'CustomUser', '$state', '$rootScope', function($scope,$stateParams,
                                                                                                                             Event, User, $state, $rootScope) {
  $scope.eventId = $stateParams.eventId;
  $scope.users = User.find({
    filter: {where: { id: {neq: $rootScope.currentUser.id}}}
  });


}])
  .controller('SendInviteController', ['$scope', '$stateParams', 'Event', 'CustomUser', '$state', '$rootScope', function($scope,$stateParams,
                                                                                                                          Event, User, $state, $rootScope) {

    User.invite({id: $stateParams.userId, eventId: $stateParams.eventId});

  }])
  .controller('JoinEventController', ['$scope', '$stateParams', 'Event',
  '$state', '$rootScope', 'Participation', function($scope,$stateParams,
                                   Event, $state, $rootScope, Participation) {
    console.log($stateParams);
    console.log("evet " + $stateParams.eventId);
      console.log("user " + $rootScope.currentUser.id);
    Event.participants.link({id: $stateParams.eventId, fk: $rootScope.currentUser.id}).$promise.then(function (data) {
      console.log(data);
      $state.go('all-events');
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
