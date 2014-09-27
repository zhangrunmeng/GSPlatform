/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular',
        '../revisionsModule'], function(
        angular,
        module){
        return module.controller('revisionCtrl', [
            '$scope',
            '$element',
            'beacon.utility',
            'RestUtil',
            '$stateParams',
            function ($scope, $element, BeaconUtil, RestUtil, $stateParams) {

                $scope.$emit('setCurrentView', 'Revisions Details');
            }]);
        }
);