/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular'], function(
        angular){
        return angular.module('beacon.revisions').controller('beacon.revisionsCtrl', [
            '$scope',
            '$element',
            '$http',
            '$state',
            '$timeout',
            'beacon.utility',
            'RestUtil',
            function ($scope, $element, $http, $state, $timeout, BeaconUtil, RestUtil) {
                var trendSeries;
                var seriesData;

                var rendererTrendChart = function(){
                    $scope.selectedRepo = BeaconUtil.getRepoById($scope.repositories, $scope.repositoryId);
                    if($scope.selectedRepo){
                        trendSeries = [];
                        seriesData = {"ok":{name:'Ok', data:[]}, "warning":{name:"Warning",data:[]}, "error":{name:"Error",data:[]}};
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
                                labels: {
                                    enabled : false
                                }
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
                                            if(e.point.revision && e.point.revision != $scope.revisionId){
                                                $scope.revisionId = e.point.revision;
                                                getRevisionDetails(false);
                                            }
                                        }
                                    },
                                    cursor : 'pointer'
                                }
                            },
                            series: trendSeries
                        }
                        getRevisionDetails(true);
                    }
                }

                this.bootstrap = function(){
                    $scope.selectedRevision = {};
                    if(!$scope.repositoryId){
                        var defaultRepo;
                        for(var group in $scope.repositories){
                            var first = $scope.repositories[group][0];
                            defaultRepo = first.product + '_' + first.release + '_' + first.component;
                            break;
                        }
                        if(defaultRepo){
                            $state.go('revisions', {'repo': defaultRepo});
                        }
                        return;
                    }
                    rendererTrendChart();
                }

                var getRevisionDetails = function(init){
                    if(init){
                        if($state.current.name == 'revisions'){
                            if(!$scope.revisionId) $scope.revisionId = 'latest';
                            $state.go('revision', {'rev' : $scope.revisionId});
                        } else {
                            $scope.$broadcast('showRevisionDetails');
                        }
                    } else {
                        $state.go('revision', {'rev' : $scope.revisionId});
                    }
                }

                $scope.$emit('setCurrentView', 'Revisions Details');
                $scope.$on('bootstrap', this.bootstrap);
                $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
//                    if(fromState.name == 'revision' && toState.name == 'revisions'){
//                        if(!$scope.revisionId) $scope.revisionId = 'latest';
//                        $state.go('revision', {'rev' : $scope.revisionId});
//                    }
                    $scope.revisionId = undefined;
                });
                this.bootstrap();
            }]);
        }
);