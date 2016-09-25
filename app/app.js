
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
            .when('/contact/:msg?', {
                templateUrl: 'pages/contact.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);


var MainCtrl = angular.module('MainCtrl', []);



Directory.controller('MainCtrl', ['$scope','$routeParams',
    function($scope, $routeParams){
        $scope.message = "Bienvenue sur la page d'accueil";
        $scope.isActive = false;
        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
        }
    }
]);