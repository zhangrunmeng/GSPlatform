/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       'common/ngTableRenderer/ngTableRenderer',
       './scripts/services',
       './scripts/controllers',
       './scripts/directives',
       './scripts/filters',
       './lib/signalr/jquery.signalR-2.0.2',
       'css!./styles/themes/css/' + $theme + '/app',
       'css!./styles/themes/css/' + $theme + '/custom'
    ], function(angular){
        return angular
            .module('jobManagement', [
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'ngTableRenderer',
                'job.controllers',
                'job.filters',
                'job.directives',
                'job.services'
            ])
            .constant('serviceUrl','http://vhwebdevserver.eng.citrite.net');
    });