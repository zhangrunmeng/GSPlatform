'use strict';

/**
 * @ngdoc function
 * @name jobManagement.controller:JobdetailctrlCtrl
 * @description
 * # JobdetailctrlCtrl
 * Controller of the jobManagement
 */
define(['angular'], function(angular){
    return function ($scope,$element,Restangular,Utility) {
        // $scope.job={"JobName":"Product-version-component-testtag-faketool","Setting":{"JobName":"SRC-Product-version-component-testtag","BuildPeriody":"H 2 * * 1-5","ScmSetting":{"$type":"StringDetectorService.ReqResModel.GitSettingDto, StringDetectorService","RepositoryUrl":"https://github.com/wilsondjm/BugTrackingSystem.git","Name":"origin","BranchSpecifier":"*/master"}},"Configuration":{"JobName":null,"Configuration":null},"Builds":{"JobName":"Product-version-component-testtag-faketool","JobHistories":[{"Duration":"39633","FullDisplayName":"Product-version-component-testtag-faketool #37","Id":"2014-08-22_20-34-46","Number":"37","Result":"SUCCESS"},{"Duration":"39608","FullDisplayName":"Product-version-component-testtag-faketool #36","Id":"2014-08-12_20-25-11","Number":"36","Result":"SUCCESS"},{"Duration":"40135","FullDisplayName":"Product-version-component-testtag-faketool #35","Id":"2014-08-11_19-46-57","Number":"35","Result":"SUCCESS"},{"Duration":"39652","FullDisplayName":"Product-version-component-testtag-faketool #34","Id":"2014-08-11_19-44-46","Number":"34","Result":"SUCCESS"},{"Duration":"39510","FullDisplayName":"Product-version-component-testtag-faketool #33","Id":"2014-08-08_11-09-50","Number":"33","Result":"SUCCESS"},{"Duration":"39496","FullDisplayName":"Product-version-component-testtag-faketool #32","Id":"2014-08-08_11-08-57","Number":"32","Result":"SUCCESS"},{"Duration":"39531","FullDisplayName":"Product-version-component-testtag-faketool #31","Id":"2014-08-08_11-06-57","Number":"31","Result":"SUCCESS"},{"Duration":"39587","FullDisplayName":"Product-version-component-testtag-faketool #30","Id":"2014-08-07_19-59-59","Number":"30","Result":"SUCCESS"},{"Duration":"39521","FullDisplayName":"Product-version-component-testtag-faketool #29","Id":"2014-08-07_19-31-51","Number":"29","Result":"SUCCESS"},{"Duration":"39612","FullDisplayName":"Product-version-component-testtag-faketool #28","Id":"2014-08-07_19-24-21","Number":"28","Result":"SUCCESS"},{"Duration":"39501","FullDisplayName":"Product-version-component-testtag-faketool #27","Id":"2014-08-07_18-07-43","Number":"27","Result":"SUCCESS"},{"Duration":"40034","FullDisplayName":"Product-version-component-testtag-faketool #26","Id":"2014-08-07_18-05-44","Number":"26","Result":"SUCCESS"},{"Duration":"39619","FullDisplayName":"Product-version-component-testtag-faketool #25","Id":"2014-08-07_18-04-40","Number":"25","Result":"SUCCESS"},{"Duration":"39603","FullDisplayName":"Product-version-component-testtag-faketool #24","Id":"2014-08-07_17-47-45","Number":"24","Result":"SUCCESS"},{"Duration":"10316","FullDisplayName":"Product-version-component-testtag-faketool #23","Id":"2014-08-07_17-19-34","Number":"23","Result":"ABORTED"},{"Duration":"11714","FullDisplayName":"Product-version-component-testtag-faketool #22","Id":"2014-08-07_16-57-46","Number":"22","Result":"ABORTED"},{"Duration":"5168","FullDisplayName":"Product-version-component-testtag-faketool #21","Id":"2014-08-07_16-57-23","Number":"21","Result":"ABORTED"},{"Duration":"39816","FullDisplayName":"Product-version-component-testtag-faketool #20","Id":"2014-08-07_16-54-10","Number":"20","Result":"SUCCESS"},{"Duration":"39584","FullDisplayName":"Product-version-component-testtag-faketool #19","Id":"2014-08-07_16-49-03","Number":"19","Result":"SUCCESS"},{"Duration":"39762","FullDisplayName":"Product-version-component-testtag-faketool #18","Id":"2014-08-07_16-48-03","Number":"18","Result":"SUCCESS"},{"Duration":"17733","FullDisplayName":"Product-version-component-testtag-faketool #17","Id":"2014-08-07_14-29-37","Number":"17","Result":"ABORTED"},{"Duration":"39946","FullDisplayName":"Product-version-component-testtag-faketool #16","Id":"2014-08-07_14-20-30","Number":"16","Result":"SUCCESS"},{"Duration":"39554","FullDisplayName":"Product-version-component-testtag-faketool #15","Id":"2014-08-07_14-15-29","Number":"15","Result":"SUCCESS"},{"Duration":"39639","FullDisplayName":"Product-version-component-testtag-faketool #14","Id":"2014-08-07_13-16-15","Number":"14","Result":"SUCCESS"},{"Duration":"39658","FullDisplayName":"Product-version-component-testtag-faketool #13","Id":"2014-08-07_13-05-27","Number":"13","Result":"SUCCESS"},{"Duration":"39596","FullDisplayName":"Product-version-component-testtag-faketool #12","Id":"2014-08-07_13-00-14","Number":"12","Result":"SUCCESS"},{"Duration":"39485","FullDisplayName":"Product-version-component-testtag-faketool #11","Id":"2014-08-07_12-34-46","Number":"11","Result":"SUCCESS"},{"Duration":"39680","FullDisplayName":"Product-version-component-testtag-faketool #10","Id":"2014-08-06_13-12-09","Number":"10","Result":"SUCCESS"},{"Duration":"39604","FullDisplayName":"Product-version-component-testtag-faketool #9","Id":"2014-08-06_12-58-08","Number":"9","Result":"SUCCESS"},{"Duration":"39720","FullDisplayName":"Product-version-component-testtag-faketool #8","Id":"2014-08-04_13-12-27","Number":"8","Result":"SUCCESS"},{"Duration":"39688","FullDisplayName":"Product-version-component-testtag-faketool #7","Id":"2014-08-04_11-54-01","Number":"7","Result":"SUCCESS"},{"Duration":"39649","FullDisplayName":"Product-version-component-testtag-faketool #6","Id":"2014-08-04_09-49-15","Number":"6","Result":"SUCCESS"},{"Duration":"39958","FullDisplayName":"Product-version-component-testtag-faketool #5","Id":"2014-08-04_09-46-31","Number":"5","Result":"SUCCESS"},{"Duration":"39747","FullDisplayName":"Product-version-component-testtag-faketool #4","Id":"2014-08-04_09-17-42","Number":"4","Result":"SUCCESS"},{"Duration":"39768","FullDisplayName":"Product-version-component-testtag-faketool #3","Id":"2014-08-01_18-21-23","Number":"3","Result":"SUCCESS"},{"Duration":"39544","FullDisplayName":"Product-version-component-testtag-faketool #2","Id":"2014-07-31_16-55-30","Number":"2","Result":"SUCCESS"},{"Duration":"39704","FullDisplayName":"Product-version-component-testtag-faketool #1","Id":"2014-07-31_16-54-51","Number":"1","Result":"SUCCESS"}],"LastBuild":{"Duration":"39633","FullDisplayName":"Product-version-component-testtag-faketool #37","Id":"2014-08-22_20-34-46","Number":"37","Result":"SUCCESS"}},"Report":{"JobName":"Product-version-component-testtag-faketool","Completed":true,"Report":"Started by user citrix\r\nBuilding remotely on Slave02 (fakeone) in workspace C:\\workspace\\workspace\\Product-version-component-testtag-faketool\r\n[Product-version-component-testtag-faketool] $ cmd /c call C:\\Windows\\TEMP\\hudson3393177776944385550.bat\r\n\r\nC:\\workspace\\workspace\\Product-version-component-testtag-faketool>ping -n 40 127.0.0.1   & echo hello \r\n\r\nPinging 127.0.0.1 with 32 bytes of data:\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\n\r\nPing statistics for 127.0.0.1:\r\n    Packets: Sent = 40, Received = 40, Lost = 0 (0% loss),\r\nApproximate round trip times in milli-seconds:\r\n    Minimum = 0ms, Maximum = 0ms, Average = 0ms\r\nhello\r\n\r\nC:\\workspace\\workspace\\Product-version-component-testtag-faketool>exit 0 \r\nFinished: SUCCESS\r\n","Offset":3099},"Status":{"JobName":"Product-version-component-testtag-faketool","Status":"Success"}};
        // $scope.job={"JobName":"Product2-version-component-testtag-faketool","Setting":{"JobName":"SRC-Product2-version-component-testtag","BuildPeriody":"H 2 * * 1-5","ScmSetting":{"$type":"StringDetectorService.ReqResModel.PerforceSettingDto, StringDetectorService","SCMPort":"NKGP401.eng.citrite.net:2777","UserName":"andylee","Password":"!QWSEDRTYHUQWERTYUI==","Workspace":"vincenthu_NKGWVINCENTHU_Lic_SD","ViewMap":"//prodlic/develop/main/src/LSMetaInstallerUI/... //vincenthu_NKGWVINCENTHU_Lic_SD/LSMetaInstallerUI/...\n//prodlic/develop/main/src/Jazz/UI/... //vincenthu_NKGWVINCENTHU_Lic_SD/Jazz/UI/...\n//prodlic/develop/main/src/Tango/UI/... //vincenthu_NKGWVINCENTHU_Lic_SD/Tango/UI/..."}},"Configuration":{"JobName":null,"Configuration":null},"Builds":{"JobName":"Product2-version-component-testtag-faketool","JobHistories":[{"Duration":"31408","FullDisplayName":"Product2-version-component-testtag-faketool #9","Id":"2014-08-07_21-37-58","Number":"9","Result":"ABORTED"},{"Duration":"39597","FullDisplayName":"Product2-version-component-testtag-faketool #8","Id":"2014-08-07_19-32-30","Number":"8","Result":"SUCCESS"},{"Duration":"39539","FullDisplayName":"Product2-version-component-testtag-faketool #7","Id":"2014-08-07_18-06-25","Number":"7","Result":"SUCCESS"},{"Duration":"39596","FullDisplayName":"Product2-version-component-testtag-faketool #6","Id":"2014-08-07_16-57-59","Number":"6","Result":"SUCCESS"},{"Duration":"5036","FullDisplayName":"Product2-version-component-testtag-faketool #5","Id":"2014-08-07_16-57-23","Number":"5","Result":"ABORTED"},{"Duration":"39906","FullDisplayName":"Product2-version-component-testtag-faketool #4","Id":"2014-08-07_14-51-29","Number":"4","Result":"SUCCESS"},{"Duration":"39562","FullDisplayName":"Product2-version-component-testtag-faketool #3","Id":"2014-08-07_12-31-48","Number":"3","Result":"SUCCESS"},{"Duration":"8022","FullDisplayName":"Product2-version-component-testtag-faketool #2","Id":"2014-08-07_09-44-12","Number":"2","Result":"ABORTED"},{"Duration":"39573","FullDisplayName":"Product2-version-component-testtag-faketool #1","Id":"2014-08-06_13-13-59","Number":"1","Result":"SUCCESS"}],"LastBuild":{"Duration":"31408","FullDisplayName":"Product2-version-component-testtag-faketool #9","Id":"2014-08-07_21-37-58","Number":"9","Result":"ABORTED"}},"Report":{"JobName":"Product2-version-component-testtag-faketool","Completed":true,"Report":"Started by user citrix\r\nBuilding remotely on Slave02 (fakeone) in workspace C:\\workspace\\workspace\\Product2-version-component-testtag-faketool\r\n[Product2-version-component-testtag-faketool] $ cmd /c call C:\\Windows\\TEMP\\hudson272049074091383699.bat\r\n\r\nC:\\workspace\\workspace\\Product2-version-component-testtag-faketool>ping -n 40 127.0.0.1 \r\n\r\nPinging 127.0.0.1 with 32 bytes of data:\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nBuild was aborted\r\nAborted by citrix\r\nFinished: ABORTED\r\n","Offset":2627},"Status":{"JobName":"Product2-version-component-testtag-faketool","Status":"Aborted"}};
        // $scope.job={"JobName":"Product3-version-component-testtag-faketool","Setting":{"JobName":"SRC-Product3-version-component-testtag","BuildPeriody":"H 2 * * 1-4","ScmSetting":{"$type":"StringDetectorService.ReqResModel.SVNSettingDto, StringDetectorService","RepositoryUrl":"http://self-resource.googlecode.com/svn/trunk","LocalModulDir":"./release"}},"Configuration":{"JobName":null,"Configuration":null},"Builds":{"JobName":"Product3-version-component-testtag-faketool","JobHistories":[{"Duration":"39537","FullDisplayName":"Product3-version-component-testtag-faketool #15","Id":"2014-08-21_18-22-00","Number":"15","Result":"SUCCESS"},{"Duration":"39555","FullDisplayName":"Product3-version-component-testtag-faketool #14","Id":"2014-08-21_02-33-58","Number":"14","Result":"SUCCESS"},{"Duration":"39560","FullDisplayName":"Product3-version-component-testtag-faketool #13","Id":"2014-08-20_02-33-59","Number":"13","Result":"SUCCESS"},{"Duration":"39451","FullDisplayName":"Product3-version-component-testtag-faketool #12","Id":"2014-08-19_02-34-05","Number":"12","Result":"SUCCESS"},{"Duration":"39586","FullDisplayName":"Product3-version-component-testtag-faketool #11","Id":"2014-08-14_02-34-35","Number":"11","Result":"SUCCESS"},{"Duration":"39686","FullDisplayName":"Product3-version-component-testtag-faketool #10","Id":"2014-08-13_02-34-35","Number":"10","Result":"SUCCESS"},{"Duration":"39542","FullDisplayName":"Product3-version-component-testtag-faketool #9","Id":"2014-08-12_02-34-37","Number":"9","Result":"SUCCESS"},{"Duration":"39567","FullDisplayName":"Product3-version-component-testtag-faketool #8","Id":"2014-08-11_02-37-21","Number":"8","Result":"SUCCESS"},{"Duration":"39591","FullDisplayName":"Product3-version-component-testtag-faketool #7","Id":"2014-08-07_13-59-40","Number":"7","Result":"SUCCESS"},{"Duration":"39556","FullDisplayName":"Product3-version-component-testtag-faketool #6","Id":"2014-08-07_02-34-44","Number":"6","Result":"SUCCESS"},{"Duration":"39498","FullDisplayName":"Product3-version-component-testtag-faketool #5","Id":"2014-08-06_02-36-44","Number":"5","Result":"SUCCESS"},{"Duration":"8273","FullDisplayName":"Product3-version-component-testtag-faketool #4","Id":"2014-08-05_20-11-08","Number":"4","Result":"ABORTED"},{"Duration":"18052","FullDisplayName":"Product3-version-component-testtag-faketool #3","Id":"2014-08-05_19-29-46","Number":"3","Result":"ABORTED"},{"Duration":"39549","FullDisplayName":"Product3-version-component-testtag-faketool #2","Id":"2014-08-05_16-46-22","Number":"2","Result":"SUCCESS"},{"Duration":"39620","FullDisplayName":"Product3-version-component-testtag-faketool #1","Id":"2014-08-05_16-42-58","Number":"1","Result":"SUCCESS"}],"LastBuild":{"Duration":"39537","FullDisplayName":"Product3-version-component-testtag-faketool #15","Id":"2014-08-21_18-22-00","Number":"15","Result":"SUCCESS"}},"Report":{"JobName":"Product3-version-component-testtag-faketool","Completed":true,"Report":"Started by user citrix\r\nBuilding remotely on Slave02 (fakeone) in workspace C:\\workspace\\workspace\\Product3-version-component-testtag-faketool\r\n[Product3-version-component-testtag-faketool] $ cmd /c call C:\\Windows\\TEMP\\hudson7401738998343032430.bat\r\n\r\nC:\\workspace\\workspace\\Product3-version-component-testtag-faketool>ping -n 40 127.0.0.1 \r\n\r\nPinging 127.0.0.1 with 32 bytes of data:\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\r\n\r\nPing statistics for 127.0.0.1:\r\n    Packets: Sent = 40, Received = 40, Lost = 0 (0% loss),\r\nApproximate round trip times in milli-seconds:\r\n    Minimum = 0ms, Maximum = 0ms, Average = 0ms\r\n\r\nC:\\workspace\\workspace\\Product3-version-component-testtag-faketool>exit 0 \r\nFinished: SUCCESS\r\n","Offset":3081},"Status":{"JobName":"Product3-version-component-testtag-faketool","Status":"Success"}};
        // git type const
        $scope.git = Utility.gitScmType;
        $scope.svn = Utility.svnScmType;
        $scope.perforce = Utility.perforceScmType;
        $scope.selectedBuild;

        // request for job data
        var getJobSetting = function (job) {
            Restangular.one('jobs',job.JobName).get({fields:'setting'})
                .then(function(jobData){
                    $scope.job.Setting = jobData.Setting;
                    $scope.copyJob =angular.copy($scope.job);
                });
        };
        var getJobConfiguration = function(job){
            Restangular.one('jobs',job.JobName).get({fields:'configuration'})
                .then(function(jobData){
                    $scope.job.Configuration = jobData.Configuration;
                    $scope.copyJob =angular.copy($scope.job);
                });
        };
        var getJobBuilds = function(job){
            Restangular.one('jobs',job.JobName).get({fields:'builds'})
                .then(function(jobData){
                    $scope.job.Builds = jobData.Builds;
                    refreshHistoryTable();
                });
        };
        var getJobReport = function(job){
            $scope.lastBuildUrl=Restangular.one('jobs',$scope.job.JobName).one('report','lastBuild').one('file').getRequestedUrl();
            Restangular.one('jobs',job.JobName).get({fields:'report'})
                .then(function(jobData){
                    $scope.job.Report = jobData.Report;
                });
        };


        // action when clicking  tabs
        $scope.$watch('selectedTab',function(newValue){
            if(angular.isUndefined($scope.job)){
                return;
            }
            switch (newValue) {
                case Utility.settingTab:
                    console.log(newValue);
                    if(angular.isUndefined($scope.job.Setting)){
                        getJobSetting($scope.job);
                    }
                    break;
                case Utility.configureTab:
                    console.log(newValue);
                    if(angular.isUndefined($scope.job.Configuration)){
                        getJobConfiguration($scope.job);
                    };
                    break;
                case Utility.historyTab:
                    console.log(newValue);
                    if(angular.isUndefined($scope.job.Builds)){
                        getJobBuilds($scope.job);
                    } else {
                        refreshHistoryTable();
                    }
                    break;
                case Utility.reportTab:
                    console.log(newValue);
                    if(angular.isUndefined($scope.job.Report)){
                        getJobReport($scope.job);
                    }
                    break;
            }
        },true);

        // inital job load
        $scope.$on('beginJobLoad',function(event,job){
            $scope.job = job;
            // the copy job is used for editable fields;
            $scope.copyJob = angular.copy(job);

            if(angular.isUndefined(job.Setting)&&angular.isDefined(job.JobName)){
                getJobSetting(job);
            }
            // set initial tab
            $scope.selectedTab = Utility.settingTab;
            // set initial view mode
            $scope.basicEdit = $scope.scmEdit=$scope.configEdit=false;
            // reset all forms
            if(angular.isDefined($scope.basicSettingForm)){
                $scope.basicSettingForm.$setPristine();
            }
            if(angular.isDefined( $scope.scmSettingForm)){
                $scope.scmSettingForm.$setPristine();
            }
            if(angular.isDefined($scope.configForm)){
                $scope.configForm.$setPristine();
            }
            // reset table data
//            if(angular.isDefined($scope.historyTableParams)&&$scope.job.Builds){
//                $scope.historyTableParams.reload();
//            }
            // reset view build state
            $scope.showSpeciBuild=false;
        });

        $scope.$on('beginJobStart',function(event){
//            $scope.selectedTab = Utility.reportTab;
//            if(!$scope.$$phase){
//                $scope.$apply();
//            }
        });
        $scope.$on('afterJobStop',function(event){
            if(angular.isDefined($scope.job.Builds)){
                //$scope.historyTableParams.reload();
            };
        });

        $scope.$on('scrollReport',function(event,appendReport){
            $scope.selectedTab = Utility.reportTab;
            $scope.scrollReport();
        });

        // ng-table params for history builds
//        $scope.historyTableParams=new ngTableParams(
//            {
//                page:1, // first page number
//                count:15, // count per page
//                sorting: {
//                    'Number':'desc'      // initial sorting
//                }
//            },
//            {   $scope:$scope,
//                showDefaultPagination:false,
//                counts: [], // hide the page size
//                getData: function($defer , params){
//                    var data =$scope.job.Builds.JobHistories;
//                    if(angular.isUndefined(data)||data==null){
//                        data=[];
//                    }
//                    params.total(data.length);
//                    params.count(data.length);
//                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                    //$defer.resolve(data);
//                }
//            }
//        );

        var refreshHistoryTable = function(){
            if($scope.job.Builds){
                var data = [];
                angular.forEach($scope.job.Builds.JobHistories, function(build){
                   data.push({
                       'name' : build.FullDisplayName.replace($scope.job.JobName,'Build'),
                       'time' : build.Id.split('_')[0].concat(" ").concat(build.Id.split('_')[1].split('-').join(":")),
                       'duration' : build.Duration + "s",
                       'result' : build.Result,
                       'number' : build.Number
                   });
                });
                $scope.jobHistoryBuilds = data;
            }
        }

        // save setting and configuation
        $scope.saveBasic= function(isValid){
            if(!isValid){
                return;
            }
            $scope.basicEdit=false;
            var putData={JobName:$scope.copyJob.Setting.JobName,BuildPeriody: $scope.copyJob.Setting.BuildPeriody}
            Restangular.one('jobs',$scope.copyJob.JobName).customPUT(JSON.stringify(putData),'setting',{fields:'BuildPeriody'})
                .then(function(settingData){
                    $scope.job.Setting.BuildPeriody= settingData.BuildPeriody;
                    // send data: upstream Project job name,  upstream project setting , exclude job name
                    $scope.$emit('upstreamProjectSettingUpdate',$scope.job.Setting.JobName,$scope.job.Setting,$scope.job.JobName);
                });
        };
        $scope.saveSCM = function(isValid){
            if(!isValid){
                return;
            }
            $scope.scmEdit =false;
            var putData={JobName:$scope.copyJob.Setting.JobName,ScmSetting:$scope.copyJob.Setting.ScmSetting};
            Restangular.one('jobs',$scope.copyJob.JobName).customPUT(JSON.stringify(putData),'setting',{fields:'ScmSetting'})
                .then(function(settingData){
                    $scope.job.Setting.ScmSetting= settingData.ScmSetting;
                    $scope.$emit('upstreamProjectSettingUpdate',$scope.job.Setting.JobName,$scope.job.Setting,$scope.job.JobName);
                });
        };
        $scope.saveConfig = function(isValid){
            if(!isValid){
                return ;
            }
            $scope.configEdit = false;
            // current have no data
            if($scope.copyJob.Configuration){

//                Restangular.one('jobs',$scope.copyJob.JobName).customPUT(JSON.stringify($scope.copyJob.Configuration),'configuration')
//                    .then(function(configData){
//                        $scope.job.Configuration= configData;
//                    });
            }
        };
        // change config file event from fileread directive
        $scope.$on('changeConfigContent',function(event,content){
            $scope.configEdit=true;
            $scope.copyJob.Configuration.Configuration=content;
            $scope.$apply();
        });

        // view history build logic
        $scope.showBuild= function(build){
            $scope.showSpeciBuild=true;
            $scope.selectedBuild=build;
            $scope.selectedIndex= $scope.job.Builds.JobHistories.indexOf(build);
        };
        $scope.hasNoPrevBuild= function(){
            return $scope.selectedIndex==$scope.job.Builds.JobHistories.length-1;
        };
        $scope.hasNoNextBuild = function(){
            return $scope.selectedIndex==0;
        };
        $scope.prevBuild=function(){
            if($scope.hasNoPrevBuild()){
                return;
            }
            $scope.selectedIndex++;
            $scope.selectedBuild=$scope.job.Builds.JobHistories[$scope.selectedIndex];
        };
        $scope.nextBuild=function(){
            if($scope.hasNoNextBuild()){
                return;
            }
            $scope.selectedIndex--;
            $scope.selectedBuild=$scope.job.Builds.JobHistories[$scope.selectedIndex];
        };
        $scope.$watch('selectedBuild',function(build){
            if(angular.isUndefined(build)){
                return;
            }
            $scope.selectedBuildUrl =Restangular.one('jobs',$scope.job.JobName).one('report',build.number).one('file').getRequestedUrl();
            Restangular.one('jobs',$scope.job.JobName).one('report',build.number).get({fields:'report'})
                .then(function(jobData){
                    $scope.selectedBuildReport = jobData.Report;
                });
        });


    }
});
