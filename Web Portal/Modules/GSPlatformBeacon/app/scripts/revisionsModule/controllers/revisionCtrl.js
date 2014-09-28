/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular',
        '../revisionsModule'], function(
        angular,
        module){
        return module.controller('revisionCtrl', [
            '$scope',
            '$element',
            '$http',
            '$state',
            'beacon.utility',
            'RestUtil',
            '$stateParams',
            function ($scope, $element,$http,$state, BeaconUtil, RestUtil, $stateParams) {
                var trendSeries;
                var seriesData;

                var rendererTrendChart = function(){
                    var revisions = $scope.selectedRepo.revisions;
                    for(var i=0; i < revisions.length; i++){
                        for(var type in seriesData){
                            seriesData[type].data.push({name: revisions[i].time, y: revisions[i][type + 'Count']});
                        }
                    }
                    for(var type in seriesData){
                        trendSeries.push({
                            name : seriesData[type].name,
                            data : seriesData[type].data,
                            visible : type != "ok"
                        })
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
                                lineWidth: 1
                            }
                        },
                        series: trendSeries
                    }
                }

                var setFilteredDetails = function(data){
                    $scope.filteredData = data;
                    if(!$scope.$$phase){
                        $scope.$apply();
                    }
                }

                var bootstrap = function(){
                    trendSeries = [];
                    seriesData = {"ok":{name:'Ok', data:[]}, "error":{name:"Error",data:[]}, "warning":{name:"Warning",data:[]}};
                    $scope.filteredData = [];
                    $scope.totalDetails = $scope.filteredData.length;
                    $scope.detailGridOptions = {
                        data : 'filteredData',
                        columnDefs: [
                            {field:'severity', displayName: 'Severity', width: "70px",
                             cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><div class='text-center' ng-class='{true: \"error\", false: \"warning\"}[row.getProperty(col.field) == \"error\"]'>{{row.getProperty(col.field)}}</div></div>"},
                            {field:'code', displayName:'Code', width: "auto", cellClass: 'cellToolTip', cellTemplate: "<div ng-class='col.colIndex()' class='ngCellText'><span tooltip-placement='bottom' tooltip='{{row.getProperty(\"message\")}}'>{{row.getProperty(col.field)}}</span></div>"},
                            {field:'file', displayName:'File', width: "20%", resizable:true},
                            {field:'line', displayName:'Line', width: "auto"},
                            {field:'context', displayName: 'Context', width: "auto", cellTemplate: 'modules/beacon/views/templates/detailContextCell.html',resizable:true, sortable: false, width: "**"}
                        ],
                        enableColumnReordering : true,
                        enableColumnResize : true,
                        enablePaging: false,
                        showFooter: false,
//                        selectedItems : $scope.selectedJobs,
                        showSelectionCheckbox : false,
                        multiSelect : false
                    };
                    getRevisionDetails();
                }

                var getRevisionDetails = function(){
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
//                    $http.get(BeaconUtil.modulePath + "data/revision.json").then(function(result){
//
//                    });
                    $scope.selectedRepo = BeaconUtil.getRepoById($scope.repositories, $scope.repositoryId);
                    if($scope.selectedRepo){
                        RestUtil.jsonp('repository/'+$scope.repositoryId+'/revision/'+$scope.revisionId, function(data){
                            $scope.selectedRevision = BeaconUtil.updateRevision($scope.selectedRepo, data);
                            setFilteredDetails($scope.selectedRevision.details)
                            rendererTrendChart();

                        });
                    }
                }

                $scope.$emit('setCurrentView', 'Revisions Details');
                $scope.$on('bootstrap', bootstrap);
                bootstrap();
            }]);
        }
);