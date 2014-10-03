/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular'], function(
        angular){
        return angular.module('beacon.revisions').controller('revisionsCtrl', [
            '$scope',
            '$element',
            '$http',
            '$state',
            'beacon.utility',
            'RestUtil',
            '$timeout',
            function ($scope, $element, $http, $state, BeaconUtil, RestUtil, $timeout) {
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

                this.bootstrap = function(){
                    if(!$scope.repositoryId){
                        var defaultRepo;
                        for(var group in $scope.repositories){
                            var first = $scope.repositories[group][0];
                            defaultRepo = first.product + '_' + first.release + '_' + first.component;
                            break;
                        }
                        if(defaultRepo)
                            $state.go('revisions', {'repo': defaultRepo});
                        return;
                    }
                    rendererTrendChart();
                }

                var getRevisionDetails = function(){
                    if($scope.selectedRepo) {
                        if(!$scope.revisionId){
                            $scope.revisionId = 'latest';
                        }
                        $state.go('revision', {'rev' : $scope.revisionId});
                    }
                }

                $scope.$emit('setCurrentView', 'Revisions Details');
                $scope.$on('bootstrap', this.bootstrap);
                this.bootstrap();
            }]);
        }
);