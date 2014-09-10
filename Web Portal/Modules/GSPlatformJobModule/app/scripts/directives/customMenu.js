'use strict';

/**
 * @ngdoc directive
 * @name gsPlatformToolApp.directive:customMenu
 * @description
 * # customMenu
 */
define(['angular'],function(angular){
    return function (Utility) {
        return {
            templateUrl: 'modules/job/views/partials/customMenu.html',
            restrict: 'E',
            scope:true,
            link: function postLink(scope, element, attrs) {
                // element.text('this is the customMenu directive');
                // the scope is root scope
                scope.minifyToggle = function(){
                    element.parent().parent().toggleClass("minified");
                };

                var options ={
                    accordion : false,
                    speed : 235,
                    closedSign : '<em class="fa fa-plus-square-o"></em>',
                    openedSign : '<em class="fa fa-minus-square-o"></em>'
                };
                scope.options = options= angular.extend(Utility.MenuOption,options);
                //add a mark [+] to a multilevel menu
                element.find("li").each(function() {
                    if ($(this).find("ul").size() != 0) {
                        //add the multilevel sign next to the link
                        $(this).find("a:first").append("<b class='collapse-sign'>" +  options.closedSign + "</b>");

                        //avoid jumping to the top of the page when the href is an #
                        if ($(this).find("a:first").attr('href') == "#") {
                            $(this).find("a:first").click(function() {
                                return false;
                            });
                        }
                    }
                });

                //open active level
                element.find("li.active").each(function() {
                    $(this).parents("ul").slideDown(scope.options.speed);
                    $(this).parents("ul").parent("li").find("b:first").html(options.openedSign);
                    $(this).parents("ul").parent("li").addClass("open")
                });
                element.find("li a").click(function() {
                    if ($(this).parent().find("ul").size() != 0) {
                        if (options.accordion) {
                            //Do nothing when the list is open
                            if (!$(this).parent().find("ul").is(':visible')) {
                                var parents = $(this).parent().parents("ul");
                                var visible = element.find("ul:visible");
                                visible.each(function(visibleIndex) {
                                    var close = true;
                                    parents.each(function(parentIndex) {
                                        if (parents[parentIndex] == visible[visibleIndex]) {
                                            close = false;
                                            return false;
                                        }
                                    });
                                    if (close) {
                                        if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                            $(visible[visibleIndex]).slideUp(scope.options.speed, function() {
                                                $(this).parent("li").find("b:first").html(options.closedSign);
                                                $(this).parent("li").removeClass("open");
                                            });

                                        }
                                    }
                                });
                            }
                        }// end if
                        if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
                            $(this).parent().find("ul:first").slideUp(scope.options.speed, function() {
                                $(this).parent("li").removeClass("open");
                                $(this).parent("li").find("b:first").delay(scope.options.speed).html(options.closedSign);
                            });

                        } else {
                            $(this).parent().find("ul:first").slideDown(scope.options.speed, function() {
                                /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                                $(this).parent("li").addClass("open");
                                $(this).parent("li").find("b:first").delay(options.speed).html(options.openedSign);
                            });
                        } // end else
                    } // end if
                });

                var updateSize = function (evt, scale){
                    var leftPanel= element.parent();
                    var root = angular.element('body');
                    leftPanel.css({'min-height' : scale.height + 'px', 'top' : (root.height() - scale.height) + "px"});
                }

                scope.$on('updateSize', updateSize);
                updateSize(null, scope.$contentScale());
            }
        };
    }
});

