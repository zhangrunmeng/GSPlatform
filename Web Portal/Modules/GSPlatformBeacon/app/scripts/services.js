/**
 * Created by runmengz on 9/22/2014.
 */
/**
 * Created by hammer on 2014/8/31.
 *
 * Services, Filters and Directives are required to return an object or function, so
 * they must be loaded in sync way, by runmeng 8/31
 */

define(['angular'], function(angular){
    angular.module("beacon.services", [])
        .factory('beacon.utility', function(){
            return {
                modulePath : "modules/beacon/"
            };
        })
        .provider('beacon', function(){
            return {
                modulePath : "modules/beacon/",
                $get : function(){
                    return {modulePath : "modules/beacon/"};
                }
            }
        });

});