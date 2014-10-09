/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular'], function(angular){
    var module = 'beacon.revisions.revision';
    return angular.module(module).controller('beacon.revisionCtrl', [
            '$scope',
            '$http',
            '$stateParams',
            'beacon.utility',
            'RestUtil',
            '$timeout',
            function ($scope, $http, $stateParams, BeaconUtil, RestUtil, $timeout) {

                var me = this;
                $scope.revisionId = $stateParams.rev;

                this.setFilteredDetails = function(data){
                    $scope.filteredData = data;
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
                                cellTemplate: BeaconUtil.modulePath + 'views/templates/detailContextCell.html', resizable: true, sortable: true}
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
                    this.renderDetails();
                }

                this.renderDetails = function(){
                    if($scope.revisionId && $scope.selectedRepo){
                            if($scope.selectedRevision.revision == null || $scope.selectedRevision.revision.id != $scope.revisionId){
                                var revision = BeaconUtil.getRevisionById($scope.selectedRepo, $scope.revisionId);
                                if(!revision || !revision.details || revision.details.length == 0){
                                    RestUtil.jsonp('repository/'+$scope.selectedRepo.id+'/revision/'+$scope.revisionId, function(data){
                                        $scope.selectedRevision.revision = BeaconUtil.updateRevision($scope.selectedRepo, data);
                                        $timeout(function(){me.setFilteredDetails($scope.selectedRevision.revision.details)}, 0);
                                    });
                                } else {
                                    $scope.selectedRevision.revision = revision;
                                    $timeout(function(){me.setFilteredDetails($scope.selectedRevision.revision.details)}, 0);
                                }
        //                        $http.get(BeaconUtil.modulePath + "resources/revision.json").then(function (result) {
        //                            $scope.selectedRevision = BeaconUtil.updateRevision($scope.selectedRepo, result.data);
        //                            $timeout(function(){
        //                                me.setFilteredDetails($scope.selectedRevision.details);
        //                            }, 10);
        //                        });
                            } else {
                                $timeout(function(){me.setFilteredDetails($scope.selectedRevision.revision.details)}, 0);
                            }
                    }
                }

                $scope.$on("showRevisionDetails", this.renderDetails);
                this.bootstrap();
            }
        ]);
});