/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

require.config({
    paths: {
        angular: 'lib/angular/angular',
        angularRoute: 'lib/angular-route/angular-route',
        angularMocks: 'lib/angular-mocks/angular-mocks',
        angularResource: 'lib/angular-resource/angular-resource',
        angularMessage: 'lib/angular-messages/angular-messages',
        angularGrid: 'lib/angular-grid/ng-grid-2.0.13.debug',
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        es5shim : 'lib/es5-shim/es5-shim',
        jquery : 'lib/jquery/dist/jquery',
        json3   : 'lib/json3/lib/json3',
        lodashCompat: 'lib/lodash/dist/lodash.compat',
        ngTableX: 'lib/ng-table-x/ng-table-x',
        pace: 'lib/pace/pace',
        restAngular : "lib/restangular/dist/restangular",
        signalR: 'lib/signalr/jquery.signalR-2.0.2',
        uiBootstrap: 'lib/angular-bootstrap/ui-bootstrap-tpls',
        text: 'lib/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMessage' : ['angular'],
        'angularGrid' : ['angular', 'jquery', 'lodashCompat'],
        'restAngular' : ['angular', 'lodashCompat'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'ngTableX' : ['angular'],
        'signalR' : ['jquery']
    },
    map: {
        '*': {
            'css': 'lib/require-css/css' // or whatever the path to require-css is
        }
    },
    priority: [
        "angular"
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    'jquery',
    'angular',
    'angularRoute'
], function($, angular, angularRoute) {

    $.ajax("/api/app/", {
        dataType : "json"
    }).done(function( data ) {
        if(!data) return;
        for(var i=0; i < data.length; i++){
            if(data[i].id == "framework"){
                data.splice(i, 1);
                break;
            }
        }
        window.$installedModules = data;
        var requireModuleList = [];
        angular.forEach($installedModules, function(module){
            requireModuleList.push('modules/' + module.id + "/app");
        });
        require([
            'app',
            'routes'
        ].concat(requireModuleList), function(app){
            var $html = angular.element(document.getElementsByTagName('html')[0]);

            angular.element().ready(function() {
                angular.resumeBootstrap([app['name']]);
            });
        })
    });
});