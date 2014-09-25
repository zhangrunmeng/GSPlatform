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
                    var gridOptions = scope[attrs.gridOptions];
                    if(gridOptions.showHeaderFilter == true && gridOptions.columnDefs){
                        var colDef = gridOptions.columnDefs;

                    }
                    var template;
                }
            };
        }]);
});