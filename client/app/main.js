"use strict"

angular
  .module("todoApp", ["ngRoute"])                         //inject [in here] to make available to controllers
  .config($routeProvider =>
    $routeProvider
      .when("/", {
        controller: "MainCtrl",
        templateUrl: "partials/main.html",
      })
      .when("/todo", {
        controller: "TodoCtrl",
        templateUrl: "partials/todo.html",
      })
      .when("/editTask/:taskId", {
        controller: "EditTaskCtrl",
        templateUrl: "partials/editTask.html"
      })
  )


  ////////////////  MainCtrl for main.html - only needs "title"  ////////////////
  .controller("MainCtrl", function ($scope, $http) {      //add $http
    $http
      .get("/api/title")
      // .then((data) =>                                  //NOT destructured 
        // $scope.title = data.data.title
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )
  })

  /////////////  TodoCtrl for todo.html - needs "title" and "data"  /////////////
  .controller("TodoCtrl", function ($scope, $http, $location) {

    $scope.postNewTask = () => {
      const newTask =  {
        task: $scope.task
      }
      $http
      .post("/api/items", newTask)
      // .then(() => $scope.items.push(newTask))
      .then(reloadPage())
      .catch(console.error)
      // console.log("~MAIN.JS~ postNewTask")
    }

    $http
      .get("/api/title")
      .then(({ data: { title }}) =>                       //destructured
        $scope.title = title
      )

    $scope.removeItem = (id) => {
      // console.log("~MAIN.JS~ removeItem: ", id)
      $http
        .delete(`/api/items/${id}`)
        .then(reloadPage())
    }

    $scope.editTask = (id) => {
      // console.log("~MAIN.JS~ editTask: ", id)
      $location.path(`/editTask/${id}`)
    }


    ///////////////////////////  RELOADPAGE FN  ///////////////////////////
    function reloadPage() {
      $http
        .get("/api/items")
        .then(({ data: { items }}) => $scope.items = items)
      $scope.task = ""
    }
    reloadPage()
  })


  .controller("EditTaskCtrl", function($scope, $http, $routeParams, $location) {
    const editId = $routeParams.taskId
    // console.log("~MAIN.JS~ editId from routeParams: ", editId)

    $http
      .get(`/api/taskDescription/${editId}`)
      .then((data) => {
        const origText = data.data[0].task
        // console.log("~MAIN.JS~ origText: ", origText)
        $scope.editedTask = origText
      })

    $scope.postEditedTask = () => {
      const editedTask = {
        task: $scope.editedTask
      }

      $http
        .put(`/api/items/${editId}`, editedTask)
        .then(() => $location.path("/toDo"))
        .catch(console.error)
    }
  })
