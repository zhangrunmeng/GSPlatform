/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
    './revisionsCtrl'], function(angular){
    return angular.module('beacon.revisions')
        .controller('beacon.revisionsRouteCtrl', [
            '$stateParams',
            '$scope',
            function($stateParams, $scope){
                $scope.repositoryId = $stateParams.repo;
                //$scope.revisionId = $stateParams.rev;
            }
        ]);
});