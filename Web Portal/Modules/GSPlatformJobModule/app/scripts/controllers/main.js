'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
define(['angular'], function(angular){
    return function ($scope, $element, $rootScope, $filter, Restangular, signalRHubProxy, serviceUrl, Utility) {
        var jobHubProxy = signalRHubProxy(serviceUrl,'jobHub',{logging:true});

        var setPagingData = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.pagedData = pagedData;
            $scope.totalJobs = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            if($scope.filteredData.length == 0){
                $scope.selectedJobs.splice(0, $scope.selectedJobs.length);
            }
        };

        var getFilteredJobs = function(){
            var categoryData = $filter('jogCategoryFilter')($scope.jobs, $scope.selectedCategory);
            $scope.filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""}, Result:""}, $scope.jobFilter);
            if(angular.isUndefined($scope.filteredData)){
                $scope.filteredData = [];
            }
            setPagingData($scope.filteredData, $scope.jobPagingOptions.currentPage,  $scope.jobPagingOptions.pageSize);
        };

        $scope.$watch('jobPagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                setPagingData($scope.filteredData, $scope.jobPagingOptions.currentPage,  $scope.jobPagingOptions.pageSize);
            }
        }, true);

        // all kinds of category jobs count
        $scope.selectedCategory= Utility.defaultCategory;
        // category update
        $scope.$watch("selectedCategory", function (newvalue, oldvalue) {
            if(newvalue !== oldvalue)
                getFilteredJobs();
        });

        // a global filter for jobs
        $scope.jobFilter='';
        $scope.$watch("jobFilter", function (newvalue, oldvalue) {
            if(newvalue !== oldvalue)
                getFilteredJobs();
        });

        //sigle select job to show detail info
        $scope.isSelected = function(job){
            return $scope.selectedJobs.length > 0 && $scope.selectedJobs[0] === job;
        };

        $scope.isSelectedByName = function(jobName){
            return $scope.selectedJobs.length > 0 && $scope.selectedJobs[0].JobName === jobName;
        };

        $scope.setSelected = function(job){
            $scope.selectedJob = job;
            if($scope.selectedJobs.length == 0){
                $scope.selectedJobs.push(job);
            } else if($scope.selectedJobs[0] != job){
                $scope.jobGridOptions.selectItem($scope.pagedData.indexOf($scope.selectedJobs[0]), false);
                $scope.selectedJobs[0] = job;
            }
            $scope.jobGridOptions.selectItem($scope.pagedData.indexOf(job), true);
        };

        // user select Jobs
        $scope.$watch('selectedJobs',function(newValue,oldValue){
            if(newValue != oldValue) {
                // the first time set value or new selection
                if(oldValue.length == 0 || (newValue.length > 0 && newValue[0].JobName != oldValue[0].JobName)){
                    //$scope.setSelected(newValue[0]);
                    $scope.$broadcast('beginJobLoad', newValue[0]);
                }
            }
        }, true);

        $scope.$on('ngGridEventSorted', function(evt, SortedColumn){
            lastSelectRowIdx = null;
            $scope.rowmap = {};
            angular.forEach(evt.targetScope.domAccessProvider.grid.rowMap, function(map, idx){
                $scope.rowmap['' + map] = idx;
            });
        });

        // init jobs data
        $scope.loadJobsData = function(){
            /*temp code for test local
            $scope.jobs = [];
            for(var i=0; i < 50; i++){
                $scope.jobs.push({
                    JobName : "test Job test Job test Job test Job test Job",
                    Status : {
                        Status : "Success"
                    },
                    Result : "Completed"
                });
            }
            $scope.jobTableParams = new ngTableParams(
                {
                    page:1, // first page number
                    count:25, // count per page
                    sorting: {
                        JobName:'asc'     // initial sorting
                    }
                },
                {
                    $scope:$scope,
                    showDefaultPagination:false,
                    counts: [], // hide the page size
                    getData: function($defer , params){
                        $scope.category = $filter('categoryCount')($scope.jobs);
                        var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                        var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
                        // set total item size
                        params.total(filteredData.length);
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            filteredData;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                }
            );
            //$scope.onResize();


            //end of temp code*/


            Restangular.one('tools',Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'})
                .then(function (toolData){
                    toolData.Jobs.forEach(function(job){
                        job.Result = Utility.BuildStatusMap[job.Status.Status];
                    });
                    $scope.jobs = toolData.Jobs.filter(function(job){
                        return job.JobName!= Utility.ValidationJob;
                    });
                    if($scope.jobs.length > 0){
                        $scope.setSelected($scope.jobs[0]);
                        angular.forEach($scope.jobs,function(job){
                            if(job.Result==Utility.running){
                                $scope.invokeFetchJobReport(job.JobName);
                            };
                        });
                    }
                },function(err){
                    console.log(err);
                }).then(function(){
                    // ng-table jobs table
                    /*
                    $scope.jobTableParams = new ngTableParams(
                        {
                            page:1, // first page number
                            count:25, // count per page
                            sorting: {
                                JobName:'asc'     // initial sorting
                            }
                        },
                        {   $scope:$scope,
                            showDefaultPagination:false,
                            counts: [], // hide the page size
                            getData: function($defer , params){
                                $scope.category = $filter('categoryCount')($scope.jobs);
                                var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                                var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
                                // set total item size
                                params.total(filteredData.length);
                                var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        }
                    );
                    //$scope.onResize();
                    */

                    $scope.category = $filter('categoryCount')($scope.jobs);
                    getFilteredJobs();
                });
        }

        // multple selections
        $scope.selections=[];
        $scope.toggleSelection = function(job){
            var index = $scope.selections.indexOf(job);
            if(index>-1){
                $scope.selections.splice(index,1);
            }else{
                $scope.selections.push(job);
            }
        };

        var lastSelectRowIdx;
        $scope.selectRow = function(row, event){
            var jobs = [];
            if(lastSelectRowIdx !== undefined && event.shiftKey){
                //multi selection situation
                if(lastSelectRowIdx < row.rowIndex){
                    lastSelectRowIdx ++;
                } else if(lastSelectRowIdx > row.rowIndex){
                    lastSelectRowIdx --;
                }
                var range = lastSelectRowIdx < row.rowIndex ? {begin : lastSelectRowIdx, end: row.rowIndex} : {begin : row.rowIndex, end : lastSelectRowIdx};
                for(var i=range.begin; i <= range.end; i++) {
                    var idx = i;
                    if($scope.rowmap){
                        idx = $scope.rowmap['' + i];
                    }
                    jobs.push($scope.pagedData[idx]);
                }
            } else {
                jobs.push(row.entity);
            }
            angular.forEach(jobs, function(job){
                var index = $scope.selections.indexOf(job);
                if(event.target.checked){
                    if(index == -1){
                        $scope.selections.push(job);
                    }
                    job.selected = true;
                } else {
                    if(index > -1) {
                        $scope.selections.splice(index, 1);
                    }
                    job.selected = false;
                }
            });
            lastSelectRowIdx = row.rowIndex;
        },

        // create job call back
        $rootScope.$on('createNewJob',function(event,data){
            $scope.jobs.push(data);
        });

        // job setting update  call back
        $scope.$on('upstreamProjectSettingUpdate',function(event,upstreamProjectName,updateSetting,excludeJobName){
            $filter('filter')($scope.jobs,
                function(item){

                    if(angular.isUndefined(item.Setting)){
                        return false;
                    }
                    var shallUpdate =item.Setting.JobName==upstreamProjectName&&item.JobName!=excludeJobName;
                    if(shallUpdate){
                        item.Setting = updateSetting;
                    }
                    return shallUpdate;
                });
        });


        // top job tool bar
        $scope.jobStart = function(jobs){
            angular.forEach(jobs, function(job, idx){
                var idxCpy = idx;
                Restangular.one('jobs',job.JobName).post('start',null,{fields:'status',realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobData){
                        job.Status=jobData.Status;
                        job.Result=Utility.BuildStatusMap[job.Status.Status];
                        if(angular.isUndefined(job.Report)){
                            job.Report={JobName:job.JobName,Report:""};
                        }else{
                            job.Report.Report="";
                        }
                        $scope.invokeFetchJobReport(job.JobName);
                        if(idxCpy == jobs.length - 1){
                            $scope.setSelected(jobs[idxCpy]);
                            $scope.$broadcast('beginJobStart');
                        }
                    });
            });
        };

        $scope.jobStop = function(jobs){
            angular.forEach(jobs,function(job){
                Restangular.one('jobs',job.JobName).one('stop').remove({fields:'status',realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobData){
                        job.Status=jobData.Status;
                        job.Result=Utility.BuildStatusMap[job.Status.Status];
                    });
            });
        };

        $scope.jobDelete = function(jobs) {
            angular.forEach(jobs,function(job){
                Restangular.one('jobs',job.JobName).remove({realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobName){
                        var removeIndex= $scope.jobs.indexOf(job);
                        $scope.jobs.splice(removeIndex,1);
                    });
            });
        };

        // fetch Job Report
        ///*
         $scope.invokeFetchJobReport = function(jobName){
            jobHubProxy.invoke('fetchJobReport',jobName);
         };

         jobHubProxy.on('appendReport',function(jobName,report){
             var updateJob=  $filter('filter')($scope.jobs,{JobName:jobName})[0];
             if(angular.isUndefined(updateJob.Report)){
                updateJob.Report = {JobName : updateJob.JobName, Report : ""};
             }
             updateJob.Report.Report += report;
             if($scope.isSelectedByName(jobName)){
                $scope.$broadcast('scrollReport');
             };
         });

         jobHubProxy.on('updateReportCallback',function(jobName){
         Restangular.one('jobs',jobName).get({fields:'builds,status,report'})
             .then(function(jobData){
                 var updateJob = $filter('filter')($scope.jobs,{JobName:jobName})[0];
                 updateJob.Status = jobData.Status;
                 updateJob.Result = Utility.BuildStatusMap[jobData.Status.Status];
                 if(angular.isDefined(updateJob.Builds)){
                 // to prevent ng-table initial $data=null
                    updateJob.Builds = jobData.Builds;
                 }
                 updateJob.Report = jobData.Report;
                 $scope.$broadcast('afterJobStop');
             });
         });


         jobHubProxy.on('startJobCallBack',function(jobData){
             var job = $filter('filter')($scope.jobs,{JobName:jobData.JobName})[0];
             job.Status = jobData.Status;
             job.Result = Utility.BuildStatusMap[job.Status.Status];
             if(angular.isUndefined(job.Report)){
                job.Report = {JobName:job.JobName, Report:""};
             }else{
                job.Report.Report = "";
             }
             $scope.invokeFetchJobReport(job.JobName);
             if($scope.isSelected(job)){
                $scope.$broadcast('beginJobStart');
             }
         });

         jobHubProxy.on('stopJobCallBack',function(jobData){
             var job = $filter('filter')($scope.jobs,{JobName:jobData.JobName})[0];
             job.Status = jobData.Status;
             job.Result = Utility.BuildStatusMap[job.Status.Status];
         });

         jobHubProxy.on('addJobCallBack',function(jobData){
             jobData.Result=Utility.BuildStatusMap[jobData.Status.Status];
             $scope.jobs.push(jobData);
         });

         jobHubProxy.on('deleteJobCallBack',function(jobName){
             var job =$filter('filter')($scope.jobs,{JobName:jobName})[0];
             var removeIndex= $scope.jobs.indexOf(job);
             $scope.jobs.splice(removeIndex,1);
         });

         jobHubProxy.start();

         if(!$scope.jobs || $scope.jobs.length == 0){
             $scope.loadJobsData();
         }
         //*/
        //$scope.onResize();
    }
});
