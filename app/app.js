
'use strict';

/**
 * Déclaration de l'application pDirectory
 */


var Directory = angular.module('Directory', [
    // Dépendances du "module"
    'ngRoute',
    'MainCtrl'
]);


/**
 * Configuration du module principal : routeApp
 */
Directory.config(['$routeProvider',
    function($routeProvider) {

        // Système de routage
        $routeProvider
            .when('/home/:msg?', {
                templateUrl: 'pages/home.html',
                controller: 'MainCtrl'
            })
            .when('/directory/:msg?', {
                templateUrl: 'pages/body.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);


var MainCtrl = angular.module('MainCtrl', ['MesDirectives']);

Directory.controller('MainCtrl', function ($scope,$routeParams,$http) {




     // recuperation comagnies
function recup () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/compagnies'
        }).then(function successCallback(response) {
            $scope.msg=response.data;
            console.log($scope.msg);
        }, function errorCallback(response) {
            console.log(response);
        });

    };
recup();


    $scope.EmployeesSelect = function(x,$index) {

        console.log(x.employes,$index,"empl");
        $scope.Employees=x.employes;
    }


    $scope.message = "Bienvenue sur la page d'accueil";
    $scope.isActive = false;
    $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
    }



});

$('.btnMenu').click(function() {
    $(this).toggleClass("active");
});