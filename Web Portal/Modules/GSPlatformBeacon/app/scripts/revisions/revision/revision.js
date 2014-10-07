/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular'], function(angular){
    var module = 'beacon.revisions.revision';
    return angular.module(module)
        .controller('beacon.revisionCtrl', [
            '$scope',
            '$http',
            '$stateParams',
            'beacon.utility',
            'RestUtil',
            '$timeout',
            function ($scope, $http, $stateParams, BeaconUtil, RestUtil, $timeout) {
                $scope.revisionId = $stateParams.rev;

                this.setFilteredDetails = function(data){
                    $scope.filteredData = data;
                    $scope.loading = false;
                }

                this.bootstrap = function() {
                    $scope.filteredData = [];
                    $scope.totalDetails = $scope.filteredData.length;
                    $scope.fieldFilters = {};
                    $scope.filterOptions = {
                        filterText: "",
                        useExternalFilter: false
                    };
                    $scope.filterString = {
                        value: ''
                    }
                    $scope.detailGridOptions = {
                        data: 'filteredData',
                        columnDefs: [
                            {field: 'severity', displayName: 'Severity', width: "80px",
                                cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><div class='text-center' ng-class='{true: \"error\", false: \"warning\"}[row.getProperty(col.field) == \"error\"]'>{{row.getProperty(col.field)}}</div></div>"},
                            {field: 'code', displayName: 'Code', width: "auto", cellClass: 'cellToolTip',
                                cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><span tooltip-placement='bottom' tooltip='{{row.getProperty(\"message\")}}'>{{row.getProperty(col.field)}}</span></div>"},
                            {field: 'file', displayName: 'File', width: "20%", resizable: true},
                            {field: 'line', displayName: 'Line', width: "auto"},
                            {field: 'context', displayName: 'Context', width: "*",
                                cellTemplate: 'modules/beacon/views/templates/detailContextCell.html', resizable: true, sortable: true}
                        ],
                        showHeaderFilter: true,
                        enableColumnReordering: true,
                        enableColumnResize: true,
                        enablePaging: true,
                        showFooter: false,
                        showFilter: true,
                        pagingOptions: $scope.pagingOptions,
//                        selectedItems : $scope.selectedDetails,
                        showSelectionCheckbox: false,
                        multiSelect: false,
                        filterOptions: $scope.filterOptions
                    };

                    if($scope.revisionId){
//                    if($scope.selectedRepo){
//                        var revision = BeaconUtil.getRevisionById($scope.selectedRepo, $scope.revisionId);
//                        if(!revision || !revision.details || revision.details.length == 0){
//                            RestUtil.jsonp('repository/'+$scope.repositoryId+'/revision/'+$scope.revisionId, function(data){
//                                $scope.selectedRevision = BeaconUtil.updateRevision($scope.selectedRepo, data);
//                                $scope.$apply(setFilteredDetails($scope.selectedRevision.details));
//                            });
//                        } else {
//                            $scope.selectedRevision = revision;
//                            $timeout(function(){setFilteredDetails($scope.selectedRevision.details)}, 10);
//                        }
//                    }
                        var me = this;
                        $http.get(BeaconUtil.modulePath + "data/revision.json").then(function (result) {
                            $scope.selectedRevision = BeaconUtil.updateRevision($scope.selectedRepo, result.data);
                            $timeout(function(){
                                me.setFilteredDetails($scope.selectedRevision.details);
                            }, 10);
                        });
                    }
                }

                this.bootstrap();

            }
        ]);
});