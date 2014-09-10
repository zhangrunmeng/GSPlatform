/**
 * Created by hammer on 2014/8/31.
 *
 * Services, Filters and Directives are required to return an object or function, so
 * they must be loaded in sync way, by runmeng 8/31
 */

define(['angular',
    './services/signalRHubProxy'
    ], function(
    angular,
    signalRHubProxyFactory){

    angular.module("job.services", [])
        .factory('Utility',function(){
            // job status
            var all='All';
            var running="Running";
            var created="Created";
            var failed = "Failed";
            var completed="Completed";
            var validationJobName ='validation';
            var toolName ='faketool';
            // jenkins ball color  map
            var buildStatusMap = {
                "Failed":failed,
                "InProgress":running,
                "Unstable":failed,
                "Success":completed,
                "Pending":running,
                "Disabled":completed,
                "Aborted":completed,
                "NotBuilt":created
            };



            // menu option
            var menuOption ={
                accordion : 'true',
                speed : 200,
                closedSign : '[+]',
                openedSign : '[-]'
            };

            // tab name
            var settingTab='settingTab';
            var configureTab ='configureTab';
            var historyTab ='historyTab';
            var reportTab ='reportTab';

            // scm Type
            var gitScmType ='StringDetectorService.ReqResModel.GitSettingDto, StringDetectorService';
            var svnScmType ='StringDetectorService.ReqResModel.SVNSettingDto, StringDetectorService';
            var perforceScmType ='StringDetectorService.ReqResModel.PerforceSettingDto, StringDetectorService';

            var modeEnum={extraSmall:0,small:1,medium:2,large:3}
            return {
                BuildStatusMap : buildStatusMap,
                ValidationJob  : validationJobName,
                ToolName : toolName,
                MenuOption : menuOption,
                ModeEnum: modeEnum,
                created: created,
                running:running,
                completed:completed,
                failed:failed,
                all:all,
                defaultCategory: all,
                settingTab : settingTab,
                historyTab : historyTab,
                configureTab: configureTab,
                reportTab: reportTab,
                gitScmType:gitScmType,
                svnScmType:svnScmType,
                perforceScmType:perforceScmType
            };
        })
        .service('signalRHubProxy', function signalRHubProxy($injector, $rootScope, serviceUrl, Utility) {
            return $injector.invoke(signalRHubProxyFactory, this, {
                '$rootScope': $rootScope,
                'serviceUrl': serviceUrl,
                'Utility' : Utility
            });
        });

});