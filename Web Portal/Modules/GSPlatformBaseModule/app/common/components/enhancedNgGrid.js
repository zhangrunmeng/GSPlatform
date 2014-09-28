/**
 * Created by runmengz on 9/24/2014.
 */
define(['angular'], function(angular){
    return angular.module("common.components.enhancedNgGrid", ['ngGrid'])
        .directive("ngGridX", ['$compile', '$templateCache', function($compile, $templateCache){
            return {
                restrict: 'A',
                scope : false,
                link :  function (scope, element, attrs) {
                    var filterHeader =
                        '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">'
                        + '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>'
                        + '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"/>'
                        + '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"/>'
                        + '<div class="ngSortPriority">{{col.sortPriority}}</div>'
                        + '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"/>'
                        + '</div>'
                        + '<div ng-show="true" style="padding: 4px 4px; margin-top: 26px;position: absolute;width: 100%"><input type="text" ng-model="{{fieldFilter}}" style="width: 100%"></div>'
                        + '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"/>'

                    var gridOptions = scope[attrs.ngGridX];
                    if(gridOptions.showHeaderFilter == true && gridOptions.columnDefs){
                        var colDefs = gridOptions.columnDefs;
                        angular.forEach(colDefs, function(colDef){
                            colDef.headerCellTemplate = filterHeader.replace(/\{\{fieldFilter\}\}/, "fieldFilters." + colDef.field);
                        });
                        gridOptions.headerRowHeight = 60;
                    }
                    var linkFn = $compile("<div ng-grid=\"" + attrs.ngGridX + "\" style='height:" + element.height() + "px'></div>");
                    var content = linkFn(scope);
                    element.append(content);
                }
            };
        }]);
});