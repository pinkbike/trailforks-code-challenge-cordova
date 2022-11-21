angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filters'])

  .run(function($ionicPlatform) {
    console.log('run');

    $ionicPlatform.ready(function() {
      console.log('ready');
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    console.log('config');

    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: "templates/test.html",
        controller: 'TestController',
        cache: false
      })
    ;

    $urlRouterProvider.otherwise('/test');
  }
);

angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('starter.directives', []);
angular.module('starter.filters', []);