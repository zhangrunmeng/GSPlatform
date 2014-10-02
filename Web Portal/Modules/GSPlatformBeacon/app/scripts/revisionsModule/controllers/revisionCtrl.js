/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular'], function(
        angular){
        return angular.module('beacon.revisionsModule').controller('revisionCtrl', [
            '$scope',
            '$element',
            '$http',
            '$state',
            'beacon.utility',
            'RestUtil',
            '$stateParams',
            '$timeout',
            function ($scope, $element, $http, $state, BeaconUtil, RestUtil, $stateParams, $timeout) {
                var trendSeries;
                var seriesData;

                var rendererTrendChart = function(){
                    $scope.selectedRepo = BeaconUtil.getRepoById($scope.repositories, $scope.repositoryId);
                    if($scope.selectedRepo){
                        trendSeries = [];
                        seriesData = {"ok":{name:'Ok', data:[]}, "error":{name:"Error",data:[]}, "warning":{name:"Warning",data:[]}};
                        var revisions = $scope.selectedRepo.revisions;
                        for(var i=0; i < revisions.length; i++){
                            for(var type in seriesData){
                                seriesData[type].data.push({name: revisions[i].time, y: revisions[i][type + 'Count'], revision: revisions[i].id});
                            }
                        }
                        for(var type in seriesData){
                            trendSeries.push({
                                name : seriesData[type].name,
                                data : seriesData[type].data,
                                visible : type != "ok"
                            });
                        }
                        $scope.trendChartConf = {
                            chart: {
                                type: "area"
                            },
                            title: {
                                text: "Trend of Defects"
                            },
                            xAxis: {
                                type: 'category'
                            },
                            yAxis: {
                                allowDecimals: false,
                                min: 0,
                                title: {
                                    text: "Defects Count"
                                }
                            },
                            plotOptions: {
                                area: {
                                    stacking: 'normal',
                                    lineWidth: 1,
                                    events : {
                                        click : function(e){
                                            if(e.point.revision && e.point.revision != $scope.selectedRevision.id){
                                                $scope.loading = true;
                                                $scope.revisionId = e.point.revision;
                                                getRevisionDetails();
                                            }
                                        }
                                    },
                                    cursor : 'pointer'
                                }
                            },
                            series: trendSeries
                        }
                        getRevisionDetails();
                    }
                }

                var setFilteredDetails = function(data){
                    $scope.filteredData = data;
                    $scope.loading = false;
                    //notify();
                }

                var bootstrap = function(){
                    $scope.filteredData = [];
                    $scope.totalDetails = $scope.filteredData.length;
                    $scope.fieldFilters = {};
                    $scope.filterOptions = {
                        filterText: "",
                        useExternalFilter: false
                    };
                    $scope.filterString = {
                        value : ''
                    }
                    $scope.detailGridOptions = {
                        data : 'filteredData',
                        columnDefs: [
                            {field:'severity', displayName: 'Severity', width: "80px",
                                cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><div class='text-center' ng-class='{true: \"error\", false: \"warning\"}[row.getProperty(col.field) == \"error\"]'>{{row.getProperty(col.field)}}</div></div>"},
                            {field:'code', displayName:'Code', width: "auto", cellClass:'cellToolTip',
                                cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><span tooltip-placement='bottom' tooltip='{{row.getProperty(\"message\")}}'>{{row.getProperty(col.field)}}</span></div>"},
                            {field:'file', displayName:'File', width: "20%", resizable:true},
                            {field:'line', displayName:'Line', width: "auto"},
                            {field:'context', displayName: 'Context', width: "*",
                                cellTemplate: 'modules/beacon/views/templates/detailContextCell.html',resizable:true, sortable: true}
                        ],
                        showHeaderFilter : true,
                        enableColumnReordering : true,
                        enableColumnResize : true,
                        enablePaging: true,
                        showFooter: false,
                        showFilter: true,
                        pagingOptions: $scope.pagingOptions,
//                        selectedItems : $scope.selectedDetails,
                        showSelectionCheckbox : false,
                        multiSelect : false,
                        filterOptions: $scope.filterOptions
                    };
                    if(!$scope.repositoryId || !$scope.revisionId){
                        var defaultRepo = '';
                        var defaultRev = 'latest';
                        for(var group in $scope.repositories){
                            var first = $scope.repositories[group][0];
                            defaultRepo = first.product + '_' + first.release + '_' + first.component;
                            break;
                        }
                        $state.go('revisions', {'repo': defaultRepo, 'revision': defaultRev});
                        return;
                    }
                    rendererTrendChart();
                }

                var getRevisionDetails = function(){
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

                    //For test
                    if($scope.selectedRepo) {
                        $http.get(BeaconUtil.modulePath + "data/revision.json").then(function (result) {
                            $scope.selectedRevision = BeaconUtil.updateRevision($scope.selectedRepo, result.data);
                            $timeout(function () {
                                setFilteredDetails($scope.selectedRevision.details)
                            }, 10);
                        });
                    }
                    //End
                }

                $scope.$emit('setCurrentView', 'Revisions Details');
                $scope.$on('bootstrap', bootstrap);
                bootstrap();
            }]);
        }
);