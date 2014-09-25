/**
 * Created by runmengz on 9/24/2014.
 */
define(['angular'], function(angular) {
    return angular.module("common.components.simpleGridPager", ['ngGrid'])
        .directive('simpleGridPager', function () {
            return {
                templateUrl: 'simpleGridPager.html',
                restrict: 'E',
                link: function (scope, element, attrs) {
                    var maxPages = function () {
                        if (scope[attrs.total] === 0) {
                            return 1;
                        }
                        return Math.ceil(scope[attrs.total] / scope[attrs.pagingOptions].pageSize);
                    }

                    scope.togglePage = function (step) {
                        var page = scope[attrs.pagingOptions].currentPage;
                        if (step < 0) {
                            scope[attrs.pagingOptions].currentPage = Math.max(page + step, 1);
                        } else {
                            if (scope[attrs.total] > 0) {
                                scope[attrs.pagingOptions].currentPage = Math.min(page + step, maxPages());
                            } else {
                                scope[attrs.pagingOptions].currentPage++;
                            }
                        }
                    }

                    scope.$watch(attrs.pagingOptions, function (newvalue, oldvalue) {
                        if (newvalue !== oldvalue && (newvalue.currentPage != oldvalue.currentPage)) {
                            updatePagingInfo();
                        }
                    }, true);

                    scope.$watch(attrs.total, function (newvalue, oldvalue) {
                        if (newvalue !== oldvalue) {
                            updatePagingInfo();
                        }
                    }, true);

                    var updatePagingInfo = function () {
                        scope.pageDisplayInfo = 'Showing ' + (scope[attrs.total] > 0 ? ((scope[attrs.pagingOptions].currentPage - 1) * scope[attrs.pagingOptions].pageSize + 1) : 0) + ' to '
                            + Math.min(scope[attrs.pagingOptions].currentPage * scope[attrs.pagingOptions].pageSize, scope.totalJobs) + ' of total ' + scope[attrs.total] + ' Jobs';
                    }
                }
            }
        })
        .run(function($templateCache) {
            var template = '<div class="paging_bootstrap_two_button" >'
                            + '<div class ="pull-right">'
                                + '<div class="btn-group">'
                                    + '<button type="button" class="btn btn-success" ng-click="togglePage(-1)"><i class="fa fa-chevron-left"></i></button>'
                                    + '<button type="button" class="btn btn-success" ng-click="togglePage(1)"><i class="fa fa-chevron-right"></i></button>'
                                + '</div>'
                            + '</div>'
                         + '</div>'
                         + '<div class="dataTables_info pull-right margin-right margin-top" id="dt_basic_info">{{pageDisplayInfo}}</div>';
            $templateCache.put('simpleGridPager.html', template);
        });
});