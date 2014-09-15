/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'restAngular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       'common/ngTableRenderer/ngTableRenderer',
       './scripts/services',
       './scripts/controllers',
       './scripts/directives',
       './scripts/filters',
       './lib/signalr/jquery.signalR-2.0.2',
       'css!./styles/theme/default/app'
    ], function(angular){
        return angular
            .module('jobManagement', [
                'restangular',
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'ngTableRenderer',
                'job.controllers',
                'job.filters',
                'job.directives',
                'job.services'
            ]).constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
            .constant('serviceUrl2', "http://localhost:61586/")
            .config(function(RestangularProvider, serviceUrl){
                RestangularProvider.setBaseUrl(serviceUrl+'/api/');
            });
    });