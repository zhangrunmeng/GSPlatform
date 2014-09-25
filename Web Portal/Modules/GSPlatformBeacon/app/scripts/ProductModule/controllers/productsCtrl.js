/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
    '../ProductModule'], function(
    angular,
    productModule){
    return productModule.controller('productsCtrl', [
            '$scope',
            '$element',
            'beacon.utility',
            'RestUtil',
            function ($scope, $element, BeaconUtil, RestUtil) {
                var renderGroupChart = function() {
                    var groups = [];
                    var series = {
                        "ok" : [],
                        "warning" : [],
                        "error" : []
                    };
                    var drilldownSeries = [];
                    for(var group in $scope.repositories){
                        groups.push(group);
                        for(var type in series){
                            series[type].push({
                                y : $scope.repositories[group].reduce(function(prev, repo){
                                        return prev + repo.lastRevision[type + "Count"];
                                    }, 0),
                                name : group,
                                drilldown : group + '_' + type
                            });
                            var groupdrilldowndata = [];
                            angular.forEach($scope.repositories[group], function(repo){
                                groupdrilldowndata.push([repo.shortname, repo.lastRevision[type + "Count"]]);
                            });
                            drilldownSeries.push({
                                name : type,
                                id : group + '_' + type,
                                data : groupdrilldowndata
                            });
                        }

                    }

//                    $scope.groupCompareChartConf = {
//                        options: {
//                            chart: {
//                                type: 'column',
//                                options3d: {
//                                    enabled: false,
//                                    alpha: 15,
//                                    beta: 15,
//                                    viewDistance: 25,
//                                    depth: 40
//                                }
//                            }
//                        },
//                        title: {
//                            text: "All Repositories Defects"
//                        },
//                        xAxis: {
//                            categories: groups
//                        },
//                        yAxis: {
//                            allowDecimals: false,
//                            min: 0,
//                            title: {
//                                text: "Defects"
//                            }
//                        },
//                        plotOptions: {
//                            column: {
//                                stacking: "normal",
//                                depth: 40
//                            }
//                        },
//                        series: [
//                            {
//                                name: "OK",
//                                data: series["ok"],
//                                visible: false
//                            },
//                            {
//                                name: "Warning",
//                                data: series["warning"]
//                            },
//                            {
//                                name: "Error",
//                                data: series["error"]
//                            }
//                        ],
//                        drilldown: {
//                            series: drilldownSeries
//                        },
//                        loading: false
//                    }

                    $scope.compareChartConf = {
                        title: {
                            text: "All Repositories Defects"
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            allowDecimals: false,
                            min: 0,
                            title: {
                                text: "Defects"
                            }
                        },
                        series: [
                            {
                                name: "OK",
                                data: series["ok"],
                                visible: false
                            },
                            {
                                name: "Warning",
                                data: series["warning"]
                            },
                            {
                                name: "Error",
                                data: series["error"]
                            }
                        ],
                        drilldown: {
                            series: drilldownSeries,
                            drillUpButton : {
                                position : {
                                    y : -40
                                }
                            }
                        }
                    }
                }
                renderGroupChart();

            }]);
});