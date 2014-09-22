/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       './scripts/services',
       './scripts/DetailModule/DetailModule',
       './scripts/ProductModule/ProductModule',
       './scripts/ToolModule/ToolModule',
       'css!./styles/themes/' + $theme + '/app'
    ], function(angular){
        return angular.module('beacon',[
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'beacon.DetailModule',
                'beacon.ProductModule',
                'beacon.ToolModule'
            ]);
    });