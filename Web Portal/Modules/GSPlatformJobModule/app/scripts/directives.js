/**
 * Created by hammer on 2014/8/31.
 */
define(['angular', 'common/components/simpleGridPager'], function(angular, pager){
            angular.module("job.directives", ['job.services', pager.name])
                .directive('mainPanel', function ($window, $rootScope, Utility) {
                    return {
                        templateUrl: Utility.modulePath + 'views/main.html',
                        restrict: 'E',
                        /*controller:'MainCtrl',*/
                        link: function postLink(scope, element, attrs) {
                            // mode changed according window width , will trigger dynamic columns hide and show
                            var updateSize = function (evt, scale){
                                var jobGridDiv = element.find("div[jobgrid]");
                                jobGridDiv.css({
                                    'height' : (scale.height - 242) + 'px',
                                    'width' : '100%'
                                });
                                var oldMode = scope.mode;
                                if(jobGridDiv.width()<320){
                                    scope.mode = Utility.ModeEnum.extraSmall;
                                } else if(jobGridDiv.width()<420) {
                                    scope.mode = Utility.ModeEnum.small;
                                } else if(jobGridDiv.width()<630){
                                    scope.mode = Utility.ModeEnum.medium;
                                } else {
                                    scope.mode = Utility.ModeEnum.large;
                                }
                                if(angular.isDefined(oldMode) && scope.mode != oldMode){
                                    scope.$apply();
                                }
                            };

                            scope.$on('updateSize', updateSize);
                            updateSize(null, scope.$contentScale());
                        }
                    };
                })
                .directive('jobDetail', function (Utility) {
                    return {
                        templateUrl:  Utility.modulePath + 'views/partials/jobDetail.html',
                        restrict: 'E',
                        link: function postLink(scope, element, attrs) {
                            scope.scrollReport= function (){
                                var reportArea =  $('textarea[data-build=lastBuild]');
                                reportArea.animate({
                                    scrollTop:reportArea[0].scrollHeight - reportArea.height()
                                }, 2000);
                            };
                            var updateSize = function(evt, scale){
                                var contentHeight =  scale.height - 285;
                                element.find("div[class='tab-content']").css('height', contentHeight + 'px');
                                scope.scmSettingHeight = (scale.height - 550) + 'px';
                                element.find("div[role='tab-pane']").css('height', contentHeight + 'px');
                                scope.reportTextHeight = contentHeight - 70 + 'px';
                                //element.find("textarea[for='report']").css('height', contentHeight - 70 + 'px');
                                element.find("textarea[for='config']").css('height', contentHeight - 70 + 'px');
                                element.find("textarea[for='history']").css('height', contentHeight - 100 + 'px');
                            };

                            scope.$on('updateSize', updateSize);
                            updateSize(null, scope.$contentScale());
                        }
                    };
                })
                .directive('customJobName', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        link: function postLink(scope, element, attrs,ngModelController) {
                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
                                if(angular.isUndefined(newValue)){
                                    return;
                                }
                                console.log("customjobname:"+newValue);
                                Restangular.one("validation","custom").post('jobname',{"Input":newValue})
                                    .then(function(result){
                                        ngModelController.$setValidity('customJobName',   ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        ngModelController.$setValidity('customJobName',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('uniqueJobName', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        link: function postLink(scope, element, attrs,ngModelController) {
                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
                                if(angular.isUndefined(newValue)||!ngModelController.$error.customJobName){
                                    return;
                                }
                                console.log("uniquejobname:"+newValue);
                                Restangular.one("validation","jenkins").post("jobname",{"Input":newValue})
                                    .then(function(result){
                                        ngModelController.$setValidity('uniqueJobName', ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        console.log(error);
                                        ngModelController.$setValidity('uniqueJobName',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('checkTiming', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        controller:'checkTimingCtrl',
                        link: function postLink(scope, element, attrs,ngModelController) {
                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue,oldValue){
                                if(angular.isUndefined(oldValue)||angular.isUndefined(newValue)){
                                    return;
                                }
                                console.log("checkTiming:"+newValue);
                                Restangular.one("validation","jenkins").post('timing',{"Input":newValue})
                                    .then(function(result){
                                        scope.message = result['Message'];
                                        ngModelController.$setValidity('checkTiming',  ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        ngModelController.$setValidity('checkTiming',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('fileRead', function () {
                    return {
                        template: '<i button class="fa fa-upload"></i><input type="file" class="hide">',

                        restrict: 'E',
                        link: function postLink(scope, element, attrs) {

                            scope.triggerUpload = function(event){
                                if(event.target==element.find('i')[0]){
                                    element.find('input[type=file]').trigger('click');
                                }
                            };
                            scope.changeConfigFile = function(event){
                                // var fileChoose = $(this);
                                if (window.File && window.FileReader && window.FileList && window.Blob) {
                                    var file = event.target.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function(e){
                                        var contents = e.target.result;

                                        scope.$emit('changeConfigContent',contents);
                                        // fileChoose.prev().val(contents);
                                    }
                                    reader.readAsText(file);
                                } else {
                                    alert('The File APIs are not fully supported by your browser.');
                                }
                            };
                            element.find('i').bind('click',scope.triggerUpload);
                            element.find('input[type=file]').bind('change',scope.changeConfigFile);
                        }
                    };
                });
        });