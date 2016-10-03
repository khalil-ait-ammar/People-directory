angular.module("MesDirectives", [])
    .directive("compagnies", function() {
        return {
            restrict: "E",
            templateUrl: 'pages/compagnies.html',
            controller: function($scope,$http) {
                
            // recuperation des departements par companies sélectionnée   
            
                $scope.CompaniesSelect = function (x, $index) {
                    $scope.compindex=$index;
                    $http({
                        method: 'GET',
                        url: '/departements/?compagniesID='+$index
                    }).then(function successCallback(response) {
                        $scope.departement=response.data;
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                };
            
            // suppresion de la companies sélectionnée & vidage des departements afficher  
               
                $scope.CompaniesDelete =function () {
                    $http({
                        method: 'DELETE',
                        url: '/compagnies/'+$scope.compindex
                    }).then(function successCallback(response) {
                        console.log("delete companies");
                        $scope.compagnies.splice($scope.compindex,1);
                        $scope.departement=null;
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                };
            }
        }
    })

    .directive("departement", function() {
        return {
            restrict: "E",
            templateUrl: 'pages/departements.html',
            controller: function($scope,$http) {
                
                $scope.EmployeesSelect = function(y,$index) {
                      $scope.depid=$index;
                        $http({
                        method: 'GET',
                        url: '/employes/?departementsID='+y.id
                    }).then(function successCallback(response) {
                       $scope.Employees=response.data;
                       console.log($scope.Employees);
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                };
                $scope.DepartmentsDelete = function() {
                    $http({
                        method: 'DELETE',
                        url: '/departements/'+$scope.depid
                    }).then(function successCallback(response) {
                          console.log("delete dep ",$scope.depid);
                           $scope.Employees=null;
                        $scope.departement.splice($scope.depid,1);
                    }, function errorCallback(response) {
                        console.log(response);
                    });

                };

            }
        }
    })


 
    .directive("employees", function() {
        return {
            restrict: "E",
            templateUrl: 'pages/Employees.html',
            controller: function($scope,$http) {
                
            // recuperation des departements par companies sélectionnée   
            
                $scope.EmployeesClique = function (x, $index) {
                    $scope.employeIN=$index;
                    $scope.employeID=x.id;
                    
              
                };
            
            // suppresion de la companies sélectionnée & vidage des departements afficher  
             
                $scope.EmployeesDelete =function () {
                    $http({
                        method: 'DELETE',
                        url: '/employes/'+$scope.employeID
                    }).then(function successCallback(response) {
                        $scope.Employees.splice($scope.employeIN,1);
                        console.log(response, "delete employees");
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                };
            }
        }
    })

  