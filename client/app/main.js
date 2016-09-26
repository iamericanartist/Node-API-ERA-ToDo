'use strict'

angular
  .module('todoApp', [])
  .controller('main', function ($scope, $http) {          //add $http
    $http
      .get("/api/title")
      // .then((data) =>                                  //NOT destructured 
        // $scope.title = data.data.title
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )
  })
