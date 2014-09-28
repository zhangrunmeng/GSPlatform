/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'common/components/highChartRenderer',
       './scripts/services',
       './lib/angular-dragdrop/src/angular-dragdrop',
        'css!./styles/themes/css/' + $theme + '/app',
    ], function(angular, highChartRenderer){
        var HighChartConfig = {
            COLOR_ERROR: '#F9906F',
            COLOR_OK: '#A4E2C6',
            COLOR_WARNING: '#EEDEB0',
            setHighchartsColor : function () {
                Highcharts.setOptions({
                    colors : Highcharts.map([this.COLOR_OK, this.COLOR_WARNING, this.COLOR_ERROR, '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'], function (color) {
                        return {
                            radialGradient: {
                                cx: 0.5,
                                cy: 0.3,
                                r: 0.7
                            },
                            stops: [
                                [0, color],
                                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
                            ]
                        };
                    })
                });
            }
        }
        return angular.module('beacon',[
                'ngDragDrop',
                highChartRenderer.name,
                'beacon.services'
            ])
            .controller('beaconCtrl', ['$scope', '$element', '$http', 'beacon.utility', 'RestUtil', function($scope, $element, $http, BeaconUtil, RestUtil){
//                RestUtil.jsonp('repository', function(data){
//
//                });
                HighChartConfig.setHighchartsColor();
                $scope.repositories = {};
                $scope.myGroups = {};
                $http.get(BeaconUtil.modulePath + "data/repository.json").then(function(result){
                    $scope.repositories = BeaconUtil.buildRepositories(result.data);
                    $scope.$broadcast('bootstrap');
                });
                $scope.$on('setCurrentView', function(e, view){
                    $scope.currentView = view;
                });
                var updateSize = function(scale){
                    $element.find('#content').height(scale.height - 69);
                }
                updateSize($scope.$contentScale());
            }]);
    });