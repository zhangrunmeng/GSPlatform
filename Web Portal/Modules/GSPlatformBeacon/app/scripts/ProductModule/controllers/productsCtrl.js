/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular'], function(angular){
    return function ($scope, $element, BeaconUtil, Restangular, $http) {
        $.ajax(BeaconUtil.serviceUrl + 'repository', {
            dataType : "jsonp"
        }).done(function(data) {

        });
    };
});