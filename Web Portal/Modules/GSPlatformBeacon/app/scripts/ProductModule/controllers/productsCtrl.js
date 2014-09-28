/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
    '../ProductModule'], function(
    angular,
    productModule){
    return productModule.controller('productsCtrl', [
            '$scope',
            '$state',
            '$element',
            'beacon.utility',
            'RestUtil',
            function ($scope, $state, $element, BeaconUtil, RestUtil) {
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

                showRevisions = function(reponame){
                    if($scope.currentDisplayGroup){
                        var currentGPRepos = $scope.repositories[$scope.currentDisplayGroup] || $scope.myGroups[$scope.currentDisplayGroup];
                        if(currentGPRepos){
                            for(var i=0; i < currentGPRepos.length; i++){
                                if(currentGPRepos[i].shortname === reponame){
                                    $state.go('revisions', {'repo' : currentGPRepos[i].id, 'revision' : 'latest'});
                                    return;
                                }
                            }
                        }
                    }
                }

                var newDefaultCard = function(options, id){
                    var base = {
                        pieChartConf: {
                            plotOptions: {
                                pie: {
                                    size: '70%',
                                    innerSize: '30%'
                                }
                            },
                            chart: {
                                marginTop: 0,
                                marginRight: 20
                            }
                        }
                    };
                    if(id) base.pieChartConf.chart.events = {
                        click : function(e){
                            if($scope.currentDisplayGroup){
                                showRevisions(id)
                            } else {
                                drillDownGroup(id);
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
                                var card = cards[comp[0]];
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
                                    }, comp[0]);
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
                                        if(!$scope.currentDisplayGroup){
                                            drillDownGroup(e.point.name);
                                        } else {
                                            showRevisions(e.point.name);
                                        }
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
                        }, group);
                        for(var type in series){
                            var item = {
                                y : groups[group].reduce(function(prev, repo){
                                    return prev + repo.lastRevision[type + "Count"];
                                }, 0),
                                name : group,
                                //drilldown : group + '_' + type
                            };
                            series[type].push(item);
                            displayCard.pieChartConf.series[0].data.push({name:type, y:item.y});

                            //maintain data for drill down later
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