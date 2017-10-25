angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      $scope.user = {
        email: 'asd@asd.com',
        password: 'asd'
      };
      $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
          .then(function() {
            $state.go('all-buildings');
          });
      };
    }
  ])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      AuthService.logout()
        .then(function() {
          $state.go('all-buildings');
        });
    }
  ])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {

      $scope.register = function() {
        AuthService.register($scope.user.email, $scope.user.password, $scope.user.name)
          .then(function() {
            $state.transitionTo('sign-up-success');
          });
      };
    }
  ]);


