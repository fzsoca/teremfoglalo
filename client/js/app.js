angular
  .module('app', [
    'ui.router',
    'lbServices'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
                                                              $urlRouterProvider) {
  $stateProvider .state('forbidden', {
    url: '/forbidden',
    templateUrl: 'views/forbidden.html'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthLoginController'
    })
    .state('all-buildings', {
      url: '/all-buildings',
      templateUrl: 'views/all-buildings.html',
      controller: 'AllBuildingsController'
    })
    .state('all-events', {
      url: '/all-events',
      templateUrl: 'views/all-events.html',
      controller: 'AllEventsController'
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
    .state('sign-up-success', {
      url: '/sign-up/success',
      templateUrl: 'views/sign-up-success.html'
    });
  //$urlRouterProvider.otherwise('all-reviews');
}])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
