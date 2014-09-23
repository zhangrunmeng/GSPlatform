/**
 * Created by runmengz on 9/19/2014.
 */

define(['angular'], function(angular){
    this._baseUrl = undefined;
    var me = this;
    return angular.module("common.utils.Rest", ['restangular'])
        .provider('RestUtil', ['RestangularProvider', function(RestangularProvider){
            this.setBaseUrl = function(url){
                me._baseUrl = /\/$/.test(url)
                    ? url.substring(0, newBaseUrl.length-1)
                    : url;
                RestangularProvider.setBaseUrl(url);
            };
            this.$get = ['Restangular', function(Restangular){
                return {
                    jsonp : function(url, callback){
                        if(me._baseUrl !== undefined){
                            url = /^\//.test(url) ? me._baseUrl + url : me._baseUrl + "/" + url;
                        }
                        $.ajax(url, {
                            dataType : "jsonp"
                        }).done(function(data) {
                            if(callback) callback(data);
                        });
                    },
                    request : function(comp, method, callback){
                        if(typeof comp === "string"){
                            Restangular.one(comp)[method]().then(function(data){
                                if(callback) callback(data);
                            });
                        } else if(typeof comp === "object"){
                            var send;
                            for(var key in comp){
                                if(send === undefined){
                                    send = Restangular.one(key, comp[key]);
                                } else {
                                    send = send.one(key, comp[key]);
                                }
                            }
                            if(send){
                                send[method]().then(function(data){
                                    if(callback) callback(data);
                                });
                            }
                        }
                    }
                }
            }];
        }]);
});