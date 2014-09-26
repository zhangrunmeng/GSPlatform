/**
 * Created by runmengz on 9/19/2014.
 */
define(['angular'], function(angular){
    return angular.module("GridView", [])
        .directive("gridView", function($compile, $templateCache){
            return {
                restrict : 'A',
                scope : false,
                link : function postLink(scope, element, attrs){
                    var pagesize = attrs.size;
                    var initialize = function(newvalue, oldvalue){
                        if(newvalue !== oldvalue && angular.isDefined(newvalue)){
                            var total = newvalue.length;
                            var rowcount = Math.ceil(total/pagesize);
                            scope.rows = [];
                            for(var i=0; i < rowcount; i++){
                                var cells = [];
                                var begin = i * pagesize;
                                var end = (i + 1) * pagesize - 1 > total - 1 ? total - 1 : (i + 1) * pagesize - 1;
                                for(var j=begin; j <= end; j++){
                                    cells.push(newvalue[j]);
                                }
                                scope.rows.push({cells : cells});
                            }
                        }
                    }
                    scope.$watch(attrs.data, initialize, true);
                    scope.$watch(attrs.size, initialize);
                    initialize(scope[attrs.data]);
                }
            };
        });
//        .run(function($templateCache){
//            'use strict';
//            var template =
//                  "<div class='row' ng-repeat='row in rows'>"
//                    + "<div ng-class='cellClass' ng-repeat='cell in row.cells'>"
//                    +    '<div class="grid-view-item" ng-transclude>'
//                    +    '</div>'
//                    + '</div>'
//                + '</div>';
//            $templateCache.put('gridViewTemplate.html', template);
//        });
});