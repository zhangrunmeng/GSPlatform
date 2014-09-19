/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

define(['angular',
    'app'], function(angular, app) {

    return app.config(['$routeProvider', function($routeProvider) {
            angular.forEach($installedModules, function(module){
                var moduleInfo = {
                    templateUrl : 'modules/' + module.id + '/main.html'
                };
                if(module.controller){
                    moduleInfo.controller = module.controller;
                }
                $routeProvider.when("/" + module.id +"/", moduleInfo);
            });
            $routeProvider.when("/", {
                templateUrl : "views/main.html",
                controller  : "appContainerCtrl"
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});