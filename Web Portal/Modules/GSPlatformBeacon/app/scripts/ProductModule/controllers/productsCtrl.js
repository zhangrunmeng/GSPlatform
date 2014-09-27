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
                var groups, series, groupSeries, groupCards, drillDownSeries;

                var notify = function(){
                    if(!$scope.$$phase)
                        $scope.$apply();
                }

                $scope.drillUp = function(){
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

                var drillDownGroup = function(gp){
                    var series = [];
                    var cards = {};
                    angular.forEach(drillDownSeries, function(item){
                        var type = item.series;
                        if(item.group == gp){
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
                    var displayCards = [];
                    for(var key in cards){
                        displayCards.push(cards[key]);
                    }
                    $scope.displayCards = displayCards;
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
                                            drillDownGroup(e.point.name);
                                    }
                                },
                                cursor : 'pointer'
                            }
                        },
                        series: groupSeries
//                        ,
//                        drilldown: {
//                            series: drillDownSeries,
//                            drillUpButton : {
//                                position : {
//                                    y : -40
//                                }
//                            }
//                        }
                    }
                }

                var collectByGroups = function(groups){
                    for(var group in groups){
                        //groups.push(group);
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
                                y : groups[group].reduce(function(prev, repo){
                                    return prev + repo.lastRevision[type + "Count"];
                                }, 0),
                                name : group
                                //drilldown : group + '_' + type
                            };
                            series[type].push(item);
                            var groupdrilldowndata = [];
                            angular.forEach(groups[group], function(repo){
                                groupdrilldowndata.push([repo.shortname, repo.lastRevision[type + "Count"]]);
                            });
                            drillDownSeries.push({
                                name : type,
                                id : group + '_' + type,
                                group : group,
                                series : type,
                                data : groupdrilldowndata
                            });
                            displayCard.pieChartConf.series[0].data.push({name:type, y:item.y});
                        }
                        groupCards.push(displayCard);
                    }
                }

                var initial = function(){
                    $scope.displayCards = [];
                    groups = [];
                    series = {
                        "ok" : [],
                        "warning" : [],
                        "error" : []
                    };
                    groupSeries = [
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
                    groupCards = [];
                    drillDownSeries = [];
                }

                var bootstrap = function(){
                    initial();
                    collectByGroups($scope.repositories);
                    collectByGroups($scope.myGroups);
                    renderGroupChart();
                    $scope.displayCards = groupCards;
                }
                $scope.$on('bootstrap', bootstrap);
                $scope.$emit('setCurrentView', 'Products View');
                bootstrap();
            }]);
});