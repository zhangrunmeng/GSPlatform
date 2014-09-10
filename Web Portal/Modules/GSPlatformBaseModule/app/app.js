'use strict';

/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
define(['angular'], function(
        angular
    ){
        var moduleDependencyList = [];
        angular.forEach($installedModules, function(module){
            moduleDependencyList.push(module.moduleName);
        });

        return angular.module('gsPlatformClient', ['ngRoute'].concat(moduleDependencyList))
            .controller("gsPlatformController", function($rootScope, $scope, $location, $element, $window){
                var initialize = function(newvalue, oldvalue) {
                    if(newvalue !== oldvalue){
                        angular.forEach($installedModules, function (module) {
                            if (newvalue == "/" + module.id) {
                                $scope.selectedModule = module.id;
                                $scope.$modulePath = 'modules/' + module.id + '/';
                                $rootScope.$modulePath = $scope.$modulePath;
                            }
                        });
                    }
                };
                $scope.$installedModules = $installedModules;
                initialize($location.url());
                $scope.$watch(function(){return $location.url()}, initialize);
                $scope.$contentScale = function(){
                    return {width: $element.width(), height: $element.height() - 63}
                };
                angular.element($window).bind('resize',function(){
                    $scope.$broadcast('updateSize', {width: $element.width(), height: $element.height() - 63});
                });
                $scope.selectModule = function(module){
                    $scope.selectedModule = module.id;
                };
            });
    });

