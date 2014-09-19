/**
 * Created by runmengz on 9/19/2014.
 */
define(['angular'], function(angular){
   angular.module("GridView", [])
       .directive("gridView", function($compile, domUtilityService, $templateCache){
          return {
              restrict : 'A',
              scope : true,
              link : function(scope, element, attrs){
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
                              for(var i=begin; i <= end; i++){
                                  cells.push(newvalue[i]);
                              }
                              scope.rows.push({cells : cells});
                          }
                      }
                  }
                  scope.$watch(attrs.data, initialize);
                  initialize(scope[attrs.data]);
              }
          };
       })
       .run(function($templateCache){
           'use strict';

           $templateCache.put('')
       });
});