/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       './scripts/services',
       'css!./styles/themes/' + $theme + '/app'
    ], function(angular){
        return angular.module('beacon',[
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'beacon.services'
            ])
            .config(['$stateProvider', 'beaconProvider', function($stateProvider, beaconProvider){
                $stateProvider
                .state('product', {
                    parent: 'beacon',
                    templateUrl: beaconProvider.modulePath + 'views/partials/product.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            return $ocLazyLoad.load({
                                name : 'beacon.ProductModule',
                                files: [beaconProvider.modulePath + 'scripts/ProductModule/ProductModule.js'],
                                cache: false
                            });
                        }]
                    }
                })
                .state('detail', {
                    parent: 'beacon',
                    templateUrl: beaconProvider.modulePath + 'views/partials/detail.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            return $ocLazyLoad.load({
                                name : 'beacon.DetailModule',
                                files: [beaconProvider.modulePath + 'scripts/DetailModule/DetailModule.js'],
                                cache: false
                            });
                        }]
                    }
                })
                .state('revisions', {
                    parent: 'beacon',
                    templateUrl: beaconProvider.modulePath + 'views/partials/revisions.html',
                    resolve: {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                            return $ocLazyLoad.load({
                                name : 'beacon.revisionsModule',
                                files: [beaconProvider.modulePath + 'scripts/revisionsModule/revisionsModule.js'],
                                cache: false
                            });
                        }]
                    }
                });
            }])
            .controller('beaconCtrl', ['$state', function($state){
                $state.go('product');
            }]);
    });