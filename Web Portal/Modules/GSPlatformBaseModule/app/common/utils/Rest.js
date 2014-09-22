/**
 * Created by runmengz on 9/19/2014.
 */

define(['angular'], function(angular){
    angular.module("common.utils.Rest", [])
        .factory('Rest', function(Restangular){
            var request = function(comp, method, callback){
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
            };
            return {
                request : request
            };
        });
});