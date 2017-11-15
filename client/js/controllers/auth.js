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
  .controller('ResetPasswordController', ['$scope', 'AuthService', '$state',

    function($scope, AuthService, $state) {
      $scope.user = {
        email: 'fazekas.zsolt95@gmail.com'
      };
      $scope.submit = function () {
        AuthService.resetPassword($scope.user.email);
      }


    }
  ]).controller('ResetPasswordPost', ['$scope', 'AuthService', '$state', '$http', '$location',

  function($scope, AuthService, $state, $http, $location) {
    var token = $location.search().access_token;
    console.log(token);
    $scope.submit = function () {
      $http({
        method: 'POST',
        url: '/api/customUsers/reset-password?access_token=' + token,
        data: "newPassword=" + $scope.newPassword,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function () {
          $state.go('login');
        })

    }

  }
]).controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
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


