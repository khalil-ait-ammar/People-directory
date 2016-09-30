angular.module("MesDirectives", [])
    .directive("mail2", function() {
        return {
            restrict: "E",
            template: '                 <div class="barmid">\
            <div class="row">\
            <div class="col-md-4  bloc">\
            <div class="header">\
            <div class="row">\
            <div class="col-md-offset-1 col-md-11">\
            <p class="Companies">Departments</p>\
            </div>\
            <div class="col-md-offset-1 col-md-7">\
            <input type="text" class="form-control recherche"  placeholder="Search a departments..." ng-model="rechercheD">\
            </div>\
            </div>\
            </div>\
            <div class="divmid">\
            <div class="row centered">\
            <div class=" col-md-12 centered">\
            <div class="listItem">\
            <p ng-repeat="y in departement | filter:rechercheD" ng-click="EmployeesSelect(y,$index)">{{y.name}}</p>\
      </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        <div  class="btnRemove" ng-click="CompaniesDelete()">\
            </div>\
            </div>',
            controller: function($scope,$http) {

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
            }
        }
    })

    .directive("mail", function() {
        return {
            restrict: "E",
            template: '          <div>\
            <div class="barmid">\
            <div class="row">\
            <div class="col-md-4  bloc">\
            <div class="header">\
            <div class="row">\
            <div class="col-md-offset-1 col-md-11">\
            <p class="Companies">Companies</p>\
            </div>\
            <div class="col-md-offset-1 col-md-7">\
            <input type="text" class="form-control recherche"  placeholder="Search a company..." ng-model="rechercheC">\
            </div>\
            </div>\
        </div>\
        <div class="divmid">\
        <div class="row centered">\
        <div class=" col-md-12 centered">\
        <div class="listItem">\
        <p ng-repeat="x in msg | filter:rechercheC" ng-click="CompaniesSelect(x,$index)">{{x.name}}</p>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        <div  class="btnRemove" ng-click="CompaniesDelete()">\
            </div>\
            </div>',
        controller: function($scope,$http) {
            $scope.CompaniesSelect = function (x, $index) {
                // console.log(x.departements,$index,"hello");
                $scope.departement = x.departements;
                $scope.compid=x.id;
                $scope.compindex=$index;
            };
            $scope.CompaniesDelete =function () {

                $http({
                    method: 'DELETE',
                    url: 'http://localhost:3000/compagnies/'+$scope.compid
                }).then(function successCallback(response) {

                 $scope.msg.splice($scope.compindex,1);
                    $scope.departement=null;
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });

            };
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
        }
    }
    })

