/**
 * Created by runmengz on 9/24/2014.
 */
define(['angular'], function(angular){
    var renderChart = function(element, config) {
        var chartconf = {
            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                type: "column",
                options3d: {
                    enabled: false,
                    alpha: 15,
                    beta: 15,
                    viewDistance: 25,
                    depth: 40
                },
                marginTop: 80,
                marginRight: 40,
//                width : config.width || null,
//                height : config.size || null
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: "normal",
                    depth: 40
                }
            }
        }
        angular.extend(chartconf, config);
        element.highcharts(chartconf);
    };
    return angular.module("common.components.columnChartRenderer", [])
        .directive('columnChartRenderer', function(){
            return {
                restrict: 'A',
                scope : false,
                link :  function (scope, element, attrs) {
                    scope.$watch(attrs.chartConfig, function(newvalue, oldvalue){
                        if(newvalue !== oldvalue){
                            renderChart(element, newvalue);
                        }
                    });
                    renderChart(element, scope[attrs.chartConfig]);
                }
            };
        });
});