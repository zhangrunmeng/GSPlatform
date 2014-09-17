'use strict';

/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
define(['angular',
    'css!styles/themes/css/' + $theme + '/app',
    'css!styles/themes/css/' + $theme + '/custom2',
    'css!styles/themes/css/' + $theme + '/common',
    //temporary support current feature, move to base in progress
    'css!styles/themes/' + $theme + '/custom'
//    'less!styles/theme/default/default'
    ], function(
        angular
    ){
        var moduleDependencyList = [];
        angular.forEach($installedModules, function(module){
            moduleDependencyList.push(module.module);
        });

        return angular.module('gsPlatformClient', ['ngRoute'].concat(moduleDependencyList))
            .controller("gsPlatformController", function($rootScope, $scope, $location, $element, $window){
                //Set global theme
                $scope.$theme = "default";

                var rendererNavMenu = function(){
                    var options = {
                        accordion: false,
                        speed: 235,
                        closedSign: '<em class="fa fa-plus-square-o"></em>',
                        openedSign: '<em class="fa fa-minus-square-o"></em>'
                    };

                    if($scope.getModulePath() != "/"){
                        //render custom module nav menu
                        require(["text!" + $scope.getModulePath() + $rootScope.selectedModule.nav],
                            function(navTemplate){
                                //add a mark [+] to a multilevel menu
                                $element.find("aside[id='left-panel'] nav ul").html("<li>"
                                    + "<a href='#/' title='Home'><i class='fa fa-lg fa-fw fa-home'></i> <span class='menu-item-parent' style='margin-left: -5px'>Home</span></a>"
                                    + "</li>" + navTemplate);
                                $element.find("li").each(function () {
                                    if ($(this).find("ul").size() != 0) {
                                        //add the multilevel sign next to the link
                                        $(this).find("a:first").append("<b class='collapse-sign'>" + options.closedSign + "</b>");

                                        //avoid jumping to the top of the page when the href is an #
                                        if ($(this).find("a:first").attr('href') == "#") {
                                            $(this).find("a:first").click(function () {
                                                return false;
                                            });
                                        }
                                    }
                                });

                                //open active level
                                $element.find("li.active").each(function () {
                                    $(this).parents("ul").slideDown(options.speed);
                                    $(this).parents("ul").parent("li").find("b:first").html(options.openedSign);
                                    $(this).parents("ul").parent("li").addClass("open")
                                });
                                $element.find("li a").click(function () {
                                    if ($(this).parent().find("ul").size() != 0) {
                                        if (options.accordion) {
                                            //Do nothing when the list is open
                                            if (!$(this).parent().find("ul").is(':visible')) {
                                                var parents = $(this).parent().parents("ul");
                                                var visible = element.find("ul:visible");
                                                visible.each(function (visibleIndex) {
                                                    var close = true;
                                                    parents.each(function (parentIndex) {
                                                        if (parents[parentIndex] == visible[visibleIndex]) {
                                                            close = false;
                                                            return false;
                                                        }
                                                    });
                                                    if (close) {
                                                        if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                                            $(visible[visibleIndex]).slideUp(options.speed, function () {
                                                                $(this).parent("li").find("b:first").html(options.closedSign);
                                                                $(this).parent("li").removeClass("open");
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }// end if
                                        if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
                                            $(this).parent().find("ul:first").slideUp(options.speed, function () {
                                                $(this).parent("li").removeClass("open");
                                                $(this).parent("li").find("b:first").delay(options.speed).html(options.closedSign);
                                            });
                                        } else {
                                            $(this).parent().find("ul:first").slideDown(options.speed, function () {
                                                /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                                                $(this).parent("li").addClass("open");
                                                $(this).parent("li").find("b:first").delay(options.speed).html(options.openedSign);
                                            });
                                        } // end else
                                    } // end if
                                });
                            });
                    } else {
                        $element.find("aside[id='left-panel'] nav ul").html("");
                    }
                }

                var initialize = function(newvalue, oldvalue) {
                    if(newvalue !== oldvalue){
                        $scope.modulePath = $rootScope.modulePath = $scope.getModulePath();
                        $scope.selectedModule = $rootScope.selectedModule = $scope.getSelectedModule();
                        rendererNavMenu();
                    }
                };

                $scope.minifyToggle = function () {
                    $element.toggleClass("minified");
                };

                $rootScope.getModulePath = $scope.getModulePath = function(){
                    if($location.url() == "/"){
                        return "/";
                    } else {
                        for(var i=0; i < $installedModules.length; i++){
                            var module = $installedModules[i];
                            if($location.url().indexOf('/' + module.id + "/") == 0){
                                return 'modules/' + module.id + '/';
                            }
                        }
                        return "/";
                    }
                };

                $rootScope.getSelectedModule = $scope.getSelectedModule = function(){
                    if($location.url() == "/"){
                        return {id : "framework", url : "/"};
                    } else {
                        for(var i=0; i < $installedModules.length; i++){
                            var module = $installedModules[i];
                            if($location.url().indexOf('/' + module.id + "/") == 0){
                                return module;
                            }
                        }
                        return null;
                    }
                };
                initialize($location.url());
                $scope.$watch(function(){return $location.url()}, initialize);

                $scope.$contentScale = function(){
                    return {width: $element.width(), height: $element.height()}
                };
                angular.element($window).bind('resize',function(){
                    $scope.$broadcast('updateSize', {width: $element.width(), height: $element.height() - 63});
                });
                $scope.selectModule = function(module){
                    $scope.selectedModule = module;
                    $rootScope.selectedModule = module;
                };
            })
            .controller("appContainerCtrl", function($scope){
                $scope.installedModules =  $installedModules || [];
            })
            .directive("appContainer", function(){
                return {
                    restrict : 'A',
                    scope : true,
                    link : function(scope, element, attrs){
                        var pagesize = 4;
                        var initialize = function(newvalue, oldvalue){
                            if(newvalue !== oldvalue && angular.isDefined(newvalue)){
                                var total = newvalue.length;
                                var rowcount = Math.ceil(total/pagesize);
                                scope.rows = [];
                                for(var i=0; i < rowcount; i++){
                                    var cells = [];
                                    var begin = i * pagesize;
                                    var end = (i + 1) * pagesize - 1 > total - 1 ? total - 1 : (i + 1) * pagesize - 1;
                                    for(var i=begin; i <= end; i++){
                                        cells.push(newvalue[i]);
                                    }
                                    scope.rows.push({cells : cells});
                                }
                            }
                        }
                        scope.$watch(attrs.applist, initialize);
                        initialize(scope[attrs.applist]);
                    }
                };
            });
    });

