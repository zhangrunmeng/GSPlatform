/**
 * Created by hammer on 2014/8/31.
 */
define(['angular'], function(angular){

    angular.module("job.controllers", ['job.services'])
        .controller('JobCreateCtrl', function($rootScope, $scope ,$element, $modal, Restangular, $injector){
            require([$scope.getModulePath() + 'scripts/controllers/jobCreate'], function(jobCreate){
                $injector.invoke(jobCreate, this, {
                    '$scope': $scope,
                    '$element': $element,
                    '$modal': $modal,
                    'Restangular': Restangular
                });
            });
        })
        .controller('JobDetailCtrl', function($scope, $element, Restangular, Utility, $injector){
            require([$scope.getModulePath() + 'scripts/controllers/jobDetail'], function(jobDetail){
                $scope.jobHistoryBuilds = [];
                $scope.totalBuilds = $scope.jobHistoryBuilds.length;
                $scope.jobHistoryGridOptions = {
                    data : 'jobHistoryBuilds',
                    columnDefs: [{field:'name', displayName:'Display Name', cellTemplate: 'modules/job/views/templates/jobHistoryNameCell.html', width: "30%"},
                        {field:'time', displayName:'Build Time', width: "30%"},
                        {field:'duration', displayName:'Duration', width: "20%"},
                        {field:'result', displayName: 'Result'}],
                    enableColumnReordering : true,
                    enablePaging: false,
                    multiSelect : true
                };
                $injector.invoke(jobDetail, this, {
                    '$scope': $scope,
                    '$element': $element,
                    'Restangular': Restangular,
                    'Utility' : Utility
                });
            });
        })
        .controller('MainCtrl', function($scope, $element, $rootScope,$filter, Restangular,
                                         signalRHubProxy, serviceUrl, Utility, $injector){
            $scope.pagedData = [];
            $scope.filteredData = [];
            $scope.jobPagingOptions = {
                pageSizes: [20, 50, 100],
                pageSize: 20,
                currentPage: 1
            };
            $scope.selectedJobs = [];
            $scope.totalJobs = $scope.filteredData.length;
            $scope.jobGridOptions = {
                data : 'pagedData',
                columnDefs: [
                    {field:'selected', displayName: '', width: "30px", cellTemplate: "<div class='ngCellText' style='padding-top: 10px'><input type='checkbox' ng-checked='!!row.getProperty(col.field)' ng-click='selectRow(row, $event)'></div>"},
                    {field:'JobName', displayName:'Product Name', width: "55%"},
                    {field:'Status.Status', displayName:'Last Build', width: "20%", cellTemplate: "<div ng-class='{failedJobStatus: row.getProperty(col.field) == \"Failed\"}'><div class='ngCellText'>{{row.getProperty(col.field)}}</div></div>"},
                    {field:'Result', displayName:'Status', width: "10%", cellTemplate: "<div ng-class='{failedJobStatus: row.getProperty(col.field) == \"Failed\"}'><div class='ngCellText'>{{row.getProperty(col.field)}}</div></div>"}
                ],
                enableColumnReordering : true,
                enablePaging: true,
                showFooter: false,
                totalServerItems : 'totalJobs',
                pagingOptions: $scope.jobPagingOptions,
                selectedItems : $scope.selectedJobs,
                showSelectionCheckbox : false,
                multiSelect : false
            };

            require([$scope.getModulePath() + 'scripts/controllers/main'], function(mainCtrl){
                $injector.invoke(mainCtrl, this, {
                    '$scope': $scope,
                    '$element': $element,
                    '$rootScope': $rootScope,
                    '$filter': $filter,
                    'Restangular': Restangular,
                    'signalRHubProxy' : signalRHubProxy,
                    'serviceUrl': serviceUrl,
                    'Utility' : Utility
                });
            });
        })
        .controller('checkTimingCtrl', function($scope){
            $scope.message ="The timing input is invalid";
        });
});