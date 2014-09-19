/**
 * Created by runmengz on 8/27/2014.
 */
define(['angular'], function(angular){
    angular.module('ngTableRenderer', [])
        .directive('ngTableRenderer', function($window, $compile, $timeout) {

            var trim = function(value1, value2){
                return value1.substring(0, value1.indexOf("px")) - value2.substring(0, value2.indexOf("px"));
            }

            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'table.html',
                link :  function (scope, element, attrs) {
                    var contentHeight = attrs.contentHeight;
                    try{
                        scope.$watch(attrs.contentHeight, function(value){
                            if(!angular.isUndefined(value))
                                element.find("div[class='contentDiv']").css('height', value);
                        }, true);
                    }catch(e){};
                    element.find("div[class='contentDiv']").css('height', contentHeight);
                    scope.columnwidth = [];
                    if(!angular.isUndefined(attrs.columnWidth)){
                        scope.columnwidth = attrs.columnWidth.split(",");
                    }
                    try{
                        scope.$watch(attrs.columnWidth, function(value, old){
                            if(!angular.isUndefined(value)){
                                scope.columnwidth = value.split(",");
                            }
                            if(value == old) {
                                return;
                            }
                            if(!angular.isUndefined(value)){
                                scope.columnwidth = value.split(",");
                                $timeout(func, 0);
                            }
                        }, true);
                    }catch(e){};

                    var tableparams = element.find("table[ng-table]").attr('ng-table');
                    scope.$watch(tableparams + ".settings().scope", function(tablescope){
                        if(!angular.isUndefined(tablescope)){
                            scope.targetTableScope = tablescope.$id;
                            var headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                            element.find("table[id='table-header']").append(headerTemplate);
                            $compile(headerTemplate)(tablescope);
                            element.find("table[id!='table-header']").find('thead').remove();
                        }
                    });
                    var func = function(){
                        var headtable = element.find("table[id='table-header']");
                        var ngtable = element.find("table[ng-table]");
                        var columnes = angular.element(ngtable.find('tr')[0]).find('td');
                        headtable.attr('style', ngtable.attr('style'));
                        if(element.find("div[class='contentDiv']").width() - ngtable.width() > 5){
                            element.find("div[class='headerDiv']").css('overflow-y',"scroll");
                        } else {
                            element.find("div[class='headerDiv']").css('overflow-y',"auto");
                        }
                        var count = 0;
                        angular.forEach(angular.element(headtable.find('tr')[0]).find('th'), function(th, idx){
                            th = angular.element(th);
                            if(columnes[idx] && scope.columnwidth[count]){
                                var col = angular.element(columnes[idx]);
                                if(!th.hasClass('ng-hide')){
                                    th.css('width', scope.columnwidth[count]);
                                    col.css('width', scope.columnwidth[count++]);
                                    if(th.width() != col.width()){
                                        var width = col.width();
                                        th.css('width', width + 'px');
                                        col.css('width', width + "px");
                                    }
                                }
                            }
                        });

                    };
//                var func = function(flag){
//                    var headtable = element.find("table[id='table-header']");
//                    var ngtable = element.find("table[ng-table]");
//                    //headtable.attr('style', ngtable.attr('style'));
//                    var columnes = angular.element(ngtable.find('tr')[0]).find('td');
//                    if(flag != true && scope.columns && scope.columns.length == columnes.length){
//                        angular.forEach(columnes, function(td, idx){
//                            td = angular.element(td);
//                            if(!td.hasClass('ng-hide') && scope.columns[idx]){
//                                td.css('width', scope.columns[idx].width + 'px');
//                            }
//                        });
//                    } else {
//                        scope.columns = columnes;
//                        headtable.attr('style', ngtable.attr('style'));
//                        if(element.find("div[class='contentDiv']").width() > ngtable.width()){
//                            element.find("div[class='headerDiv']").css('overflow-y',"scroll");
//                        } else {
//                            element.find("div[class='headerDiv']").css('overflow-y',"auto");
//                        }
//
//                        var width = ngtable.width();
//                        headtable.css('width', width + "px");
//                        ngtable.css('width', width + "px");
//                        angular.forEach(angular.element(headtable.find('tr')[0]).find('th'), function(th, idx){
//                            th = angular.element(th);
//                            if(columnes[idx]){
//                                var col = angular.element(columnes[idx]);
//                                if(!th.hasClass('ng-hide')){
//                                    columnes[idx].width = col.width();
//                                    th.css('width', columnes[idx].width + 'px');
//                                    col.css('width', columnes[idx].width + "px");
//                                }
//                            }
//                        });
//                        headtable.css('width', "100%");
//                        ngtable.css('width', "100%");
//                    }
//                };

                    scope.$on('ngTableAfterReloadData', function(evt){
                        if(!scope.targetTableScope || scope.targetTableScope != evt.targetScope.$id){
                            return;
                        }
                        $timeout(func, 0)
                    });

//                angular.element($window).bind('resize',function(){
//                    func();
//                });
                }
            };
        });
    });
