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
                $scope.inDrillMode = false;
                $scope.displayCards = [];

                var groups = [], series = {
                    "ok" : [],
                    "warning" : [],
                    "error" : []
                };
                var groupSeries = [
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
                ];
                var groupCards = [];
                var drilldownSeries = [];

                var notify = function(){
                    if(!$scope.$$phase)
                        $scope.$apply();
                }

                $scope.drillup = function(){
                    $scope.compareChartConf.series = groupSeries;
                    $scope.displayCards = groupCards;
                    delete $scope.currentDisplayGroup;
                    notify();
                };

                var newDefaultCard = function(options){
                    var base = {
                        pieChartConf: {
                            chart: {
                                marginTop: 0,
                                marginRight: 20
                            }
                        }
                    };
                    angular.extend(base.pieChartConf, options);
                    return base;
                }

                var drilldownGroup = function(drilldownSeries, gp){
                    var series = [];
                    var cards = {};
                    angular.forEach(drilldownSeries, function(item){
                        var group = item.id.split("_")[0] + '_' + item.id.split("_")[1];
                        var type = item.id.split("_")[2];
                        if(group == gp){
                            //only collect current components in current drilldown group
                            series.push({
                                name : type,
                                data : item.data,
                                visible : type != 'ok'
                            });
                            angular.forEach(item.data, function(comp){
                                var card = cards[comp[0]]
                                if(!card) {
                                    card = newDefaultCard({
                                        title: {
                                            text: comp[0]
                                        },
                                        series: [{
                                            type: 'pie',
                                            name: comp[0],
                                            data: [{name: type, y: comp[1]}]
                                        }]
                                    });
                                    cards[comp[0]] = card;
                                } else {
                                    card.pieChartConf.series[0].data.push({name: type, y: comp[1]});
                                }
                            });
                        }
                    });
                    $scope.displayCards = [];
                    for(var key in cards){
                        $scope.displayCards.push(cards[key]);
                    }
                    $scope.compareChartConf.series = series;
                    $scope.currentDisplayGroup = gp;
                    notify();
                };

                var renderGroupChart = function() {
                    $scope.compareChartConf = {
                        chart: {
                            type: "column"
                        },
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
                        plotOptions: {
                            column : {
                                events : {
                                    click : function(e){
                                        if(!$scope.currentDisplayGroup)
                                            drilldownGroup(drilldownSeries, e.point.name);
                                    }
                                },
                                cursor : 'pointer'
                            }
                        },
                        series: groupSeries
//                        ,
//                        drilldown: {
//                            series: drilldownSeries,
//                            drillUpButton : {
//                                position : {
//                                    y : -40
//                                }
//                            }
//                        }
                    }
                }

                var bootstrap = function(){
                    for(var group in $scope.repositories){
                        groups.push(group);
                        var displayCard = newDefaultCard({
                            title: {
                                text: group
                            },
                            series : [{
                                type : 'pie',
                                name : group,
                                data : []
                            }]
                        });
                        for(var type in series){
                            var item = {
                                y : $scope.repositories[group].reduce(function(prev, repo){
                                    return prev + repo.lastRevision[type + "Count"];
                                }, 0),
                                name : group
                                //drilldown : group + '_' + type
                            };
                            series[type].push(item);
                            var groupdrilldowndata = [];
                            angular.forEach($scope.repositories[group], function(repo){
                                groupdrilldowndata.push([repo.shortname, repo.lastRevision[type + "Count"]]);
                            });
                            drilldownSeries.push({
                                name : type,
                                id : group + '_' + type,
                                data : groupdrilldowndata
                            });
                            displayCard.pieChartConf.series[0].data.push({name:type, y:item.y});
                        }
                        groupCards.push(displayCard);
                    }
                    $scope.displayCards = groupCards;
                    renderGroupChart();
                }

                bootstrap();
            }]);
});