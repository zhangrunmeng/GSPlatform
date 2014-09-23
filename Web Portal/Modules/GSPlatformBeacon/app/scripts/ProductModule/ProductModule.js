/**
 * Created by runmengz on 9/22/2014.
 */
define([
    'angular',
    'common/utils/Rest'],
    function(angular, Rest){
        return angular.module('beacon.ProductModule', ['beacon.services', Rest.name])
            .controller('productsCtrl',[
                '$scope',
                '$element',
                '$injector',
                'beacon.utility',
                'RestUtil',
                function($scope,
                         $element,
                         $injector,
                         BeaconUtil,
                         RestUtil){
                    require([BeaconUtil.modulePath + 'scripts/ProductModule/controllers/productsCtrl'], function(productsCtrl){
                        $injector.invoke(productsCtrl, this, {
                            '$scope': $scope,
                            '$element' : $element,
                            'BeaconUtil' : BeaconUtil,
                            'RestUtil' : RestUtil
                        });
                    });
            }]);
});