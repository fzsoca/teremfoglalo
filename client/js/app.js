angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ui.calendar'
  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,
                                                               $urlRouterProvider, $locationProvider) {
  $stateProvider.state('forbidden', {
    url: '/forbidden',
    templateUrl: 'views/forbidden.html'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthLoginController'
    })
    .state('reset-password', {
      url: '/reset-password',
      templateUrl: 'views/reset-password.html',
      controller: 'ResetPasswordController'
    })
    .state('reset-password-form', {
    url: '/reset-password-form?access_token',
    templateUrl: 'views/reset-password-form.html',
    controller: 'ResetPasswordPost'
    })
    .state('all-buildings', {
      url: '/all-buildings',
      templateUrl: 'views/all-buildings.html',
      controller: 'AllBuildingsController'
    })
    .state('statistics', {
      url: '/statistics/:roomId',
      templateUrl: 'views/statistics.html',
      controller: 'StatisticsController'
    })
    .state('event-details', {
    url: '/event-details/:eventId',
    templateUrl: 'views/event-details.html',
    controller: 'EventDetailsController'
  })
    .state('all-events', {
      url: '/all-events',
      templateUrl: 'views/all-events.html',
      controller: 'AllEventsController'
    })
    .state('join-event', {
      url: '/join-event/:eventId',
      controller: 'JoinEventController',
      authenticate: true
    })
    .state('delete-event', {
      url: '/delete-event/:eventId',
      controller: 'DeleteEventsController',
      authenticate: true
    })
    .state('create-event', {
      url: '/create-event/:roomId',
      controller: 'CreateEventController',
      templateUrl: 'views/create-event.html',
      authenticate: true
    })
    .state('my-events', {
      url: '/my-events',
      controller: 'MyEventsController',
      templateUrl: 'views/my-events.html',
      authenticate: true
    })
    .state('invite-users', {
      url: '/event-details/:eventId/invite',
      controller: 'InviteUsersController',
      templateUrl: 'views/invite.html',
      authenticate: true
    })
    .state('invite', {
      url: '/invite/:userId/:eventId',
      controller: 'SendInviteController',
      authenticate: true
    })
    .state('logout', {
      url: '/logout',
      controller: 'AuthLogoutController'

    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'views/sign-up-form.html',
      controller: 'SignUpController'
    })
    .state('select-room', {
      url: '/select-room/:buildingId',
      templateUrl: 'views/select-room.html',
      controller: 'RoomsByBuildingController'
    })
    .state('sign-up-success', {
      url: '/sign-up/success',
      templateUrl: 'views/sign-up-success.html'
    });
  //$urlRouterProvider.otherwise('all-reviews');
  //$locationProvider.html5Mode({ enabled: true });
}])
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
