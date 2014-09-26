/**
 * Created by runmengz on 9/24/2014.
 */
define(['angular'], function(angular){
    var extendDeep = function extendDeep(dst) {
        angular.forEach(arguments, function (obj) {
            if (obj !== dst) {
                angular.forEach(obj, function (value, key) {
                    if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                        extendDeep(dst[key], value);
                    } else {
                        dst[key] = angular.copy(value);
                    }
                });
            }
        });
        return dst;
    }

    var renderChart = function(element, config) {
        var chartconf = {
            credits: {
                enabled: false
            },
            chart: {
                renderTo : element[0],
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                options3d: {
                    enabled: false,
                    alpha: 15,
                    beta: 15,
                    viewDistance: 25,
                    depth: 40
                },
                marginTop: 80,
                marginRight: 40
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
        extendDeep(chartconf, config);
//        element.highcharts(chartconf);
        return new Highcharts.Chart(chartconf);
    };
    return angular.module("common.components.columnChartRenderer", [])
        .directive('highChartRenderer', function(){
            return {
                restrict: 'A',
                scope: {chartConfig: "=chartOptions"},
                link :  function (scope, element, attrs) {
                    scope.$watch('chartConfig', function(newvalue, oldvalue){
                        if(newvalue !== oldvalue){
                            if(scope.chart){
                                scope.chart.destroy();
                            }
                            scope.chart = renderChart(element, scope.chartConfig);
                        }
                    }, true);
                    scope.chart = renderChart(element, scope.chartConfig);
                }
            };
        });
});