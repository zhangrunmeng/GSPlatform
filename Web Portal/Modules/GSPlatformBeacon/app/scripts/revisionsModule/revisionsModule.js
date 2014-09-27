/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
    './controllers/revisionCtrl'], function(angular){
    return angular.module('beacon.revisionsModule')
        .controller('revisionRouteCtrl', [
            '$stateParams',
            '$scope',
            function($stateParams,$scope){
                $scope.repository = $stateParams.repo;
                $scope.revision = $stateParams.revision;
            }
        ]);
});