'use strict';

/**
 * @ngdoc function
 * @name jobManagement.controller:JobcreateCtrl
 * @description
 * # JobcreateCtrl
 * Controller of the jobManagement
 */
define([], function(){
    var ModalInstanceCtrl = function ($scope,Restangular,Utility, $modalInstance, srcJobs) {
        $scope.job={};
        $scope.srcJobs = srcJobs;
        $scope.submit = function (isValid) {
            $scope.submitted=true;
            if(!isValid){
                return;
            }

            Restangular.one('jobs').post($scope.job.JobName,$scope.job,{fields:'jobName,status',realtime:true,connectionId:Utility.connectionId})
                .then(function(data){
                    var newJob = {JobName:data.JobName,Status:data.Status,Result:Utility.BuildStatusMap[data.Status.Status]};
                    $modalInstance.dismiss('cancel');
                    $scope.$emit('createNewJob',newJob);
                });
            // $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
    return function ($scope ,$modal, Restangular) {
        $scope.openModal = function(size){
            Restangular.one('views','SRC').get({fields:'jobs(jobname)'})
                .then(function(viewData){
                    $scope.srcJobs = viewData.Jobs;
                })
                .then(function(){
                    var modalInstance = $modal.open({
                        templateUrl: 'modules/job/views/partials/createJobModal.html',
                        controller: ModalInstanceCtrl,
                        size: size,
                        resolve: {
                            srcJobs: function () {
                                return $scope.srcJobs;
                            }
                        }
                    });
                });
        };
    };
});
