'use strict'

angular
  .module('todoApp', ["ngRoute"])                         //inject [in here] to make available to controllers
  .config($routeProvider =>
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'partials/main.html',
      })
      .when('/todo', {
        controller: 'TodoCtrl',
        templateUrl: 'partials/todo.html',
      })
  )
  .controller('MainCtrl', function ($scope, $http) {      //add $http
    $http
      .get("/api/title")
      // .then((data) =>                                  //NOT destructured 
        // $scope.title = data.data.title
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )
  })
  .controller('TodoCtrl', function ($scope, $http) {
    $http
      .get('/api/messages')
      .then(({ data: { messages }}) =>
        $scope.messages = messages
      )
  })
