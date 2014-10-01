/**
 * Created by runmengz on 9/19/2014.
 */

define(['angular'], function(angular){
    return angular.module("common.utils.highcharts", [])
        .factory('HighchartsUtil', function(){
            return {
                setOptions : function(options){
                    Highcharts.setOptions(options);
                }
            }
        });
});