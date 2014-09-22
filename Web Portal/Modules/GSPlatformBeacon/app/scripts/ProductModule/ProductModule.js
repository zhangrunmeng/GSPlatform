/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
    'common/utils/Rest'], function(angular){
    return angular.module('beacon.ProductModule', ['beacon.services', 'common.utils.Rest'])
        .controller('productsCtrl', function($scope, $element, BeaconUtil, $injector){
            require([BeaconUtil.modulePath + 'scripts/ProductModule/controllers/productsCtrl'], function(productsCtrl){
                $injector.invoke(productsCtrl, this, {
                    '$scope': $scope,
                    '$element' : $element
                });
            });
        });
});