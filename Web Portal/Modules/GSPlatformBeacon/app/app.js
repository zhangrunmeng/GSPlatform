/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       'common/utils/Rest',
       'common/components/highChartRenderer',
       'common/components/gridView',
       './scripts/services',
       'css!./styles/themes/css/' + $theme + '/app',
       './lib/highcharts-ng/dist/highcharts-ng',
       './lib/angular-dragdrop/src/angular-dragdrop'
    ], function(angular, uibootstrap, ngmessage, nggrid, rest, highChartRenderer, gridView){
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
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'highcharts-ng',
                'ngDragDrop',
                rest.name,
                highChartRenderer.name,
                gridView.name,
                'beacon.services'
            ])
            .config(['$stateProvider', 'beaconProvider', function($stateProvider, beaconProvider){
                $stateProvider.state('product', {
                    parent: 'beacon',
                    url : "product",
                    templateUrl: beaconProvider.modulePath + 'views/partials/product.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            angular.module('beacon.productModule', []);
                            return $ocLazyLoad.load({
                                name : 'beacon.productModule',
                                files: [beaconProvider.modulePath + 'scripts/ProductModule/ProductModule.js'],
                                cache: false
                            });
                        }]
                    }
                })
                .state('settings', {
                    parent: 'beacon',
                    url : "settings",
                    templateUrl: beaconProvider.modulePath + 'views/partials/settings.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            angular.module('beacon.settingsModule', []);
                            return $ocLazyLoad.load({
                                name : 'beacon.settingsModule',
                                files: [beaconProvider.modulePath + 'scripts/settingsModule/settingsModule.js'],
                                cache: false
                            });
                        }]
                    }
                })
                .state('revisions', {
                    parent: 'beacon',
                    url : "revisions/:repository/:revision",
                    templateUrl: beaconProvider.modulePath + 'views/partials/revisions.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            return $ocLazyLoad.load({
                                name : 'beacon.revisionsModule',
                                files: [beaconProvider.modulePath + 'scripts/revisionsModule/revisionsModule.js'],
                                cache: false
                            });
                        }]
                    },
                    controller: ['$stateParams', '$scope', function($stateParams, $scope){

                    }]
                });
            }])
            .controller('beaconCtrl', ['$scope', '$state', '$http', 'beacon.utility', 'RestUtil', function($scope, $state, $http, BeaconUtil, RestUtil){
//                RestUtil.jsonp('repository', function(data){
//
//                });
                HighChartConfig.setHighchartsColor();
                $http.get(BeaconUtil.modulePath + "data/repository.json").then(function(result){
                    $scope.repositories = BeaconUtil.buildRepositories(result.data);
                    $state.go('settings');
                    //$scope.currentView = "Products View";
                });
                $scope.$on('$viewContentLoading',
                    function(event, viewConfig){
                        var includes = viewConfig.view.includes;
                        if(includes["product"]){
                            $scope.currentView = "Products View";
                        } else if(includes["revisions"]){
                            $scope.currentView = "Revisions View";
                        } else if(includes["settings"]) {
                            $scope.currentView = "Manage Groups";
                        }
                        // Access to all the view config properties.
                        // and one special property 'targetView'
                        // viewConfig.targetView
                    });
            }]);
    });