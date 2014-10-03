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
    'common/utils/Rest',
    'common/utils/HighchartsUtil',
    'common/components/gridView',
    'restAngular',
    'angularUIRoute',
    'uiBootstrap',
    'angularMessage',
    'angularGrid',
    'ocLazyload',
    'angularDnD',
    'css!styles/themes/css/' + $theme + '/app',
    'css!styles/themes/css/' + $theme + '/custom',
    'css!styles/themes/css/' + $theme + '/common'
    //'less!styles/theme/default/default'
    ], function(
        angular,
        rest,
        highchartsUtil,
        grid
    ){
        var compileRouters = function(modulePath, parent, parentModule, routers, result){
            if(routers && routers instanceof Array){
                angular.forEach(routers, function(router){
                    if(router.name){
                        var moduleName = parentModule + '.' + router.name;
                        router.templateUrl = modulePath + router.templateUrl;
                        var url;
                        if(router.url){
                            url = router.url;
                        } else {
                            url = "/" + router.name;
                        }
                        if(url.slice(0, 1) != "/")
                            url = "/" + url;
                        router.url = url;
                        router.resolve = {
                            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                angular.module(moduleName, []);
                                return $ocLazyLoad.load({
                                    name: moduleName,
                                    files: [modulePath + router.script],
                                    cache: false
                                });
                            }]
                        }
                        router.parent = parent;
                        result.push(router);
                        compileRouters(modulePath, router.name, moduleName, router.children, result);
                    }
                });
            }
        }

        return angular.module('gsPlatformClient',[
            'ui.router',
            'ui.bootstrap',
            'ngMessages',
            'ngGrid',
            'oc.lazyLoad',
            'ngDragDrop',
            rest.name,
            highchartsUtil.name,
            grid.name])
            .config([
                '$ocLazyLoadProvider',
                '$urlRouterProvider',
                '$locationProvider',
                '$stateProvider',
                'RestUtilProvider',
                function($ocLazyLoadProvider,
                         $urlRouterProvider,
                         $locationProvider,
                         $stateProvider,
                         RestUtilProvider) {
                    $urlRouterProvider.otherwise("");
                    $ocLazyLoadProvider.config ({
                        debug: true,
                        events: true,
                        jsLoader: requirejs,
                        loadedModules: ['gsPlatformClient']
                    });
                    $stateProvider.state('index', {
                        url : "",
                        templateUrl : 'views/main.html',
                        controller : 'appContainerCtrl'
                    });
                    angular.forEach($installedModules, function(module){
                        $stateProvider.state(module.id, {
                            url : '/' + module.id,
                            templateUrl: 'modules/' + module.id + '/main.html',
                            resolve: {
                                loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                                    if(module.serviceUrl){
                                        RestUtilProvider.setBaseUrl(module.serviceUrl);
                                    } else {
                                        RestUtilProvider.setBaseUrl("");
                                    }
                                    return $ocLazyLoad.load({
                                        name : module.module,
                                        files: ['modules/' + module.id + '/app.js'],
                                        cache: false
                                    });
                                }]
                            }
                        });
                        var routers = [];
                        compileRouters('modules/' + module.id + '/', module.id, module.id, module.routers, routers);

                        angular.forEach(routers, function(router){
                            var conf = router;
                            if(!module.default && conf.default == true){
                                module.default = "/" + module.id + conf.url;
                            }
                            $stateProvider.state(router.name, conf);
                        });
                        if(!module.default){
                            if(routers.length > 0){
                                module.default = "/" + module.id + routers[0].url;
                            } else {
                                module.default = "/" + module.id;
                            }
                        }
                    });
            }])
            .controller("gsPlatformController",[
                '$rootScope',
                '$scope',
                '$location',
                '$element',
                '$window',
                '$state',
                function($rootScope,
                         $scope,
                         $location,
                         $element,
                         $window,
                         $state){
                var rendererNavMenu = function(){
                    if($scope.modulePath != ""){
                        //render custom module nav menu
                        require(["text!" + $scope.modulePath + $scope.selectedModule.nav],
                            function(navTemplate){
                                $scope.$broadcast('onNavLoaded', "<li>"
                                    + "<a href='#' title='Home'><i class='fa fa-lg fa-fw fa-home'></i> <span class='menu-item-parent'>Home</span></a>"
                                    + "</li>"
                                    + navTemplate);
                            });
                    } else {
                        $element.find("aside[id='left-panel'] nav ul").html("");
                    }
                }

                var initialize = function(newvalue, oldvalue) {
                    if(newvalue !== oldvalue){
                        if(newvalue == ""){
                            $scope.modulePath = $rootScope.modulePath = "";
                            $scope.selectedModule = $rootScope.selectedModule = {id : "framework", url : ""};
                            rendererNavMenu();
                        }
                    }
                };

                $scope.minifyToggle = function () {
                    $element.toggleClass("minified");
                };

                initialize($location.url());
                var onModuleLoaded = function(e, module) {
                    for(var i=0; i < $installedModules.length; i++){
                        if(module == $installedModules[i].module){
                            $scope.modulePath = $rootScope.modulePath = 'modules/' + $installedModules[i].id + "/"
                            $scope.selectedModule = $rootScope.selectedModule = $installedModules[i];
                            rendererNavMenu('modules/' + $installedModules[i].id + '/' + $installedModules[i].nav);
                            break;
                        }
                    }
                }
                $scope.$on('ocLazyLoad.moduleLoaded', onModuleLoaded);
                $scope.$on('ocLazyLoad.moduleReloaded', onModuleLoaded);
                $scope.$watch(function(){return $location.url()}, function(newvalue, oldvalue) {
                    if(newvalue !== oldvalue){
                        if(newvalue == ""){
                            $scope.modulePath = $rootScope.modulePath = "";
                            $scope.selectedModule = $rootScope.selectedModule = {id : "framework", url : ""};
                            rendererNavMenu();
                        }
                    }
                });

                $scope.$contentScale = function(){
                    return {width: $element.find('[id=main]').width(), height: $element.find('[id=main]').height()}
                };
                angular.element($window).bind('resize',function(){
                    $scope.$broadcast('updateSize', $scope.$contentScale());
                });
                $scope.selectModule = function(module){
                    $scope.selectedModule = module;
                    $rootScope.selectedModule = module;
                };
            }])
            .controller("appContainerCtrl", ['$scope', function($scope){
                $scope.installedModules =  $installedModules || [];
            }])
            .directive("dynNav", ['$compile', function($compile){
                return {
                    restrict : 'A',
                    scope : false,
                    link : function(scope, element, attrs){
                        var options = {
                            accordion: false,
                            speed: 235,
                            closedSign: '<em class="fa fa-plus-square-o"></em>',
                            openedSign: '<em class="fa fa-minus-square-o"></em>'
                        };

                        scope.$on('onNavLoaded', function(evt, template){
                            var linkFn = $compile(template);
                            var content = linkFn(scope);
                            element.find("nav ul").append(content);

                            //add a mark [+] to a multilevel menu
                            element.find("li").each(function () {
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
                            element.find("li.active").each(function () {
                                $(this).parents("ul").slideDown(options.speed);
                                $(this).parents("ul").parent("li").find("b:first").html(options.openedSign);
                                $(this).parents("ul").parent("li").addClass("open")
                            });
                            element.find("li a").click(function () {
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
                    }
                }
            }]);
    });
