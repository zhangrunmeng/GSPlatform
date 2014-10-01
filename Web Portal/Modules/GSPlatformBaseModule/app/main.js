/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var requireConfig = {
    paths: {
        angular: 'lib/angular/angular',
        angularRoute: 'lib/angular-route/angular-route',
        angularUIRoute : "lib/angular-ui-router/release/angular-ui-router",
        angularUIRouteHelper : 'lib/angular-ui-router.stateHelper/statehelper',
        angularMocks: 'lib/angular-mocks/angular-mocks',
        angularResource: 'lib/angular-resource/angular-resource',
        angularMessage: 'lib/angular-messages/angular-messages',
        angularGrid: 'lib/angular-grid/ng-grid-2.0.12.debug',
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        highcharts : 'lib/highcharts/highcharts.src',
        'hc-drilldown' : 'lib/highcharts/modules/drilldown.src',
        'hc-data' : 'lib/highcharts/modules/data.src',
        hc3d : 'lib/highcharts/highcharts-3d.src',
        hcmore : 'lib/highcharts/highcharts-more.src',
        jquery : 'lib/jquery/dist/jquery',
        jqueryui : "lib/jquery-ui/jquery-ui",
        lodashCompat: 'lib/lodash/dist/lodash.compat',
        restAngular : "lib/restangular/dist/restangular",
        requireLess : "lib/require-less/less",
        uiBootstrap: 'lib/angular-bootstrap/ui-bootstrap-tpls',
        text: 'lib/requirejs-text/text',
        less: 'lib/less/dist/less-1.7.5.min',
        ocLazyload : 'lib/oclazyload/dist/ocLazyLoad'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularUIRoute': ['angular'],
        'angularUIRouteHelper': ['angular', 'angularUIRoute'],
        'angularMessage' : ['angular'],
        'angularGrid' : ['angular', 'jquery', 'lodashCompat'],
        'restAngular' : ['angular', 'lodashCompat'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'ocLazyload' : ['angular'],
        'highcharts' : ['jquery'],
        'hc3d' : ['highcharts'],
        'hcmore' : ['highcharts'],
        'hc-drilldown' : ['highcharts'],
        'hc-data' : ['highcharts']
    },
    map: {
        '*': {
            'css': 'lib/require-css/css', // or whatever the path to require-css is
            'less': 'lib/require-less/less'
        }
    },
    priority: [
        "angular"
    ]
};


var inDevelopment = getQueryString("debug") == "true";

if(inDevelopment){
    requireConfig.urlArgs = "_rv=" + new Date().getTime();
}

require.config(requireConfig);

var less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: true,
};

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";
window.$theme = "default";
window.DEBUG_MODE = true;

require([
    'jquery',
    'jqueryui',
    'angular',
    'text',
    'less',
    'highcharts',
    'hcmore',
    'hc-drilldown',
    'hc-data'
], function($, jqueryui, angular) {

    if(!DEBUG_MODE){
        $.ajax("/api/app/", {
            dataType : "json"
        }).done(function(data) {
            if(!data) return;
            for(var i=data.length-1; i >= 0; i--){
                if(data[i].id == "framework"){
                    data.splice(i, 1);
                    break;
                }
            }
            window.$installedModules = [];
            var count = data.length - 1;
            var getModuleConfig = function(){
                if(count >= 0){
                    var module = data[count];
                    require(['text!modules/' + module.id + "/config.json"], function(config){
                        try {
                            if(config)
                                $installedModules.push(JSON.parse(config));
                            count --;
                            getModuleConfig();
                        } catch(e){
                            console.error("Fail to parse config file for " + module.id);
                        }
                    });
                } else {
                    require(['app'], function(app){
                        angular.element().ready(function() {
                            angular.resumeBootstrap([app['name']]);
                        });
                    });
                }
            }
            getModuleConfig();
        });
    } else {
        window.$installedModules = [];
        require(['text!modules/beacon/config.json'], function(config){
            try {
                if(config)
                    $installedModules.push(JSON.parse(config));
                    require(['app'], function(app){
                        angular.element().ready(function() {
                            angular.resumeBootstrap([app['name']]);
                        });
                    });
            } catch(e){
                console.error("Fail to parse config file for " + module.id);
            }
        });
    }

});