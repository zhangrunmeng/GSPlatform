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
                $scope.repositoryId = $stateParams.repo;
                $scope.revisionId = $stateParams.revision;
            }
        ]);
});