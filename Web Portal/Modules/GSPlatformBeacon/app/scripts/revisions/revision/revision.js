/**
 * Created by runmengz on 9/22/2014.
 */
define(['angular',
'./revisionCtrl'], function(angular){
    return angular.module('beacon.revisions.revision')
        .controller('revisionRouteCtrl', [
            '$stateParams',
            '$scope',
            function($stateParams, $scope){
                $scope.revisionId = $stateParams.rev;
            }
        ]);
});