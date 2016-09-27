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


  ////////////////  MainCtrl for main.html - only needs "title"  ////////////////
  .controller('MainCtrl', function ($scope, $http) {      //add $http
    $http
      .get("/api/title")
      // .then((data) =>                                  //NOT destructured 
        // $scope.title = data.data.title
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )
  })


  /////////////  TodoCtrl for todo.html - needs "title" and "data"  /////////////
  .controller('TodoCtrl', function ($scope, $http) {
    $scope.sendMessage = () => {
      const msg =  {
        task: $scope.task,
      }
////////////////////////////////////  POST  ////////////////////////////////////
      $http
      .post("/api/messages", msg)
      .then(() => $scope.messages.push(msg))
      .catch(console.error)
    }
////////////////////////////////////  GETS  ////////////////////////////////////
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )
    $http
      .get('/api/messages')
      .then(({ data: { messages }}) =>
        $scope.messages = messages
      )
  })
