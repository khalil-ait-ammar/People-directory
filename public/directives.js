angular.module("MesDirectives", [])
    .directive("compagnies", function() {
        return {
            restrict: "E",
            templateUrl: 'pages/compagnies.html',
            controller: function($scope, $http) {

                // recuperation des departements par companies sélectionnée   

                $scope.CompaniesSelect = function(x, $index) {
                    $scope.compindex = $index;
                    $http({
                        method: 'GET',
                        url: '/departements/?compagniesID=' + $index
                    }).then(function successCallback(response) {
                        $scope.departement = response.data;
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                };

                // suppresion de la companies sélectionnée & vidage des departements afficher  

                $scope.CompaniesDelete = function() {
                    $http({
                        method: 'DELETE',
                        url: '/compagnies/' + $scope.compindex
                    }).then(function successCallback(response) {
                        console.log("delete companies");
                        $scope.compagnies.splice($scope.compindex, 1);
                        $scope.departement = null;
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
        controller: function($scope, $http) {

  // recuperation des employees par departement sélectionnée  

            $scope.EmployeesSelect = function(y, $index) {
                $scope.depid = $index;
                $http({
                    method: 'GET',
                    url: '/employes/?departementsID=' + y.id
                }).then(function successCallback(response) {
                    $scope.Employees = response.data;
                    console.log($scope.Employees);
                }, function errorCallback(response) {
                    console.log(response);
                });
            };
            
             // suppresion departement sélectionnée & vidage des employes afficher  
             
            $scope.DepartmentsDelete = function() {
                $http({
                    method: 'DELETE',
                    url: '/departements/' + $scope.depid
                }).then(function successCallback(response) {
                    console.log("delete dep ", $scope.depid);
                    $scope.Employees = null;
                    $scope.departement.splice($scope.depid, 1);
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
        controller: function($scope, $http) {
            
            // recuperation de tous les compagies

            $http({
                method: 'GET',
                url: '/compagnies'
            }).then(function successCallback(response) {
                $scope.form1 = response.data;
                console.log($scope.form1, "form1");
            }, function errorCallback(response) {
                console.log(response);
            });
            
            // recuperation de tous les departements

            $http({
                method: 'GET',
                url: '/departements'
            }).then(function successCallback(response) {
                $scope.form2 = response.data;
                console.log($scope.form2, "form2");
            }, function errorCallback(response) {
                console.log(response);
            });



            // recuperation de l'employe sélectionnée   

            $scope.EmployeesClique = function(x, $index) {
                $scope.employeIN = $index;
                $scope.employeID = x.id;


            };

            // suppresion de l'employee sélectionnée & reflech liste employees afficher   

            $scope.EmployeesDelete = function() {
                $http({
                    method: 'DELETE',
                    url: '/employes/' + $scope.employeID
                }).then(function successCallback(response) {
                    $scope.Employees.splice($scope.employeIN, 1);
                    console.log(response, "delete employees");
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.EmployeesAdd = function() {
                
        // test formulaire valide         
                if ($scope.myForm.$valid) {

//ajout de l'employee 
              
                         $http({
                 method: 'POST',
                     url: '/employes/',
                    data: { 
                        name: $scope.addname,
                        email: $scope.addEmail,
                        phone: $scope.addphone,
                        celphone: $scope.celphone,
                        title: $scope.addtitle,
                        Company: $scope.selectedCompany.name,
                        departementsID: $scope.selectedDepartment.id
                     }
                    }).then(function successCallback(response) {
                     
                    console.log(response);
                  }, function errorCallback(response) {
                     console.log(response);
                  });


 // atribution de la class date-dismiss pour fermer la popup 
                    var el = angular.element('#btnadd');
                    el.attr('data-dismiss', 'modal');
                } else {
                    alert("vous n'avez pas validé tous les champs")
                }


            };


        }
    }
})