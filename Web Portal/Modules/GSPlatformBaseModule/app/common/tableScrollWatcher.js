/**
 * Created by runmengz on 8/29/2014.
 */
angular.module('tableScrollWatcher', [])
    .directive('tableScroll', function() {
        return {
            restrict: 'A',
            scope: true,
            link :  function (scope, element, attrs) {
                element.scroll(function(){
                    if(element.scrollTop() <= 0){
                        if(scope.header){
                            scope.header.remove();
                            scope.header = null;
                        }
                    } else {
                        if(!scope.header){
                            scope.header = angular.element(document.createElement("div")).css({
                                'position' : "absolute",
                                'top' : element.scrollTop() + "px",
                                'height': '36px',
                                'background' : '#eee',
                                'z-index' : 999,
                                'font-size' : "12px"
                            });
                            var table = angular.element(document.createElement("table"));
                            var tr = angular.element(document.createElement("tr"));
                            table.attr("class", element.find("table").attr("class"));
                            table.width(element.find("table").width() + "px");
                            table.prepend(tr);
//                            table.prepend(angular.element(element.find("table thead tr")[0]).clone());
                            angular.forEach(angular.element(element.find("table thead tr")[0]).find('th'), function(th){
                                th = angular.element(th);
                                if(th.width() <= 0) return;
                                tr.append(th.clone().width(th.width() + "px").css({
                                    'font-size' : th.css('fount-size')
                                }));
                            });
                            scope.header.prepend(table);
                            element.prepend(scope.header);
                        } else {
                            scope.header.css({
                                'top' : element.scrollTop()+"px"
                            });
                        }
                    }

                });
            }
        }
    });