/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular',
        '../settingsModule'], function(
        angular,
        settingsModule){
        return settingsModule.controller('settingsCtrl', [
            '$scope',
            '$element',
            'beacon.utility',
            'RestUtil',
            function ($scope, $element, BeaconUtil, RestUtil) {
                $scope.predefinedGroups = [];
                $scope.myGroups = [];
                $scope.configEdit = false;

                $scope.addComponents = function(test){

                }

                var bootstrap = function(){
                    for(var key in $scope.repositories){
                        $scope.predefinedGroups.push({name : key, repositories: $scope.repositories[key]});
                    }
                }
                bootstrap();

            }]);
        }
);