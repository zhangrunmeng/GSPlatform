/**
 * Created by runmengz on 9/10/2014.
 */
angular.module("webPortalAdmin", ['ngGrid'])
    .controller('moduleManageCtrl', function($scope, $http){
        $scope.selectedModule = [];
        $scope.installedModules = [];
        $scope.modulePagingOptions = {
            pageSizes: [20, 50, 100],
            pageSize: 20,
            currentPage: 1
        };
        $scope.moduleGridOptions = {
            data : 'installedModules',
            columnDefs: [
                {field:'name', displayName: 'Module', width: "40%"},
                {field:'version', displayName:'Version', width: "15%"},
                {field:'time', displayName:'Update Time', width: "25%"},
                {field:'', displayName:'Action', width: "*", cellTemplate: "templates/moduleActions.html"}
            ],
            enableColumnReordering : true,
            enablePaging: true,
            showFooter: true,
            totalServerItems : 'totalJobs',
            pagingOptions: $scope.modulePagingOptions,
            selectedItems : $scope.selectedModule,
            showSelectionCheckbox : true,
            multiSelect : false
        };

        $scope.upgradeModule = function(module){

        };

        $scope.uninstallModule = function(module){

        };

        $http({
            method: "GET",
            url: "/api/app"
        }).success(function(data){
            $scope.installedModules = data;
        });

    })
    .controller('fileUploaderCtrl', function ($scope) {
    })
    .directive('fileUploader', function ($http) {
        return {
            restrict: 'E',
            scope : true,
            template: '<form ng-submit="upload()"><div><input name="file" type="file" multiple/><input type="submit"/></div>'
                        + '<ul><li ng-repeat="file in files"> {{file.name}} </li></ul></form>',
            link: function (scope, $element) {
                var fileInput = angular.element($element.find('input')[0]);
                fileInput.bind('change', function (e) {
                    scope.notReady = e.target.files.length == 0;
                    scope.files = [];
                    for (var i in e.target.files) {
                        //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                        if (typeof e.target.files[i] == 'object') scope.files.push(e.target.files[i]);
                    }
                });
                scope.upload = function () {
                    var fd = new FormData();
                    for (var i = 0; i < scope.files.length; i++) {
                        fd.append('file' + i, scope.files[i]);
                    }
                    $http({
                        method: 'POST',
                        url: '/api/app/install',
                        data: fd,  // pass in data as strings
                        headers: { 'Content-Type': undefined },  // set the headers so angular passing info as form data (not request payload)
                        transformRequest: angular.identity
                    }).success(function (data) {
                        console.log(data);
                    });
                };
            }
        }
    });
