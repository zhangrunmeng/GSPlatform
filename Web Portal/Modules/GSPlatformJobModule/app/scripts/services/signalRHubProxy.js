'use strict';

/**
 * @ngdoc service
 * @name jobManagement.signalRHubProxy
 * @description
 * # signalRHubProxy
 * Service in the jobManagement.
 */
define([], function(){
    return function signalRHubProxy($rootScope,serviceUrl,Utility) {
                function signalRHubProxyFactory (serverUrl,hubName,startOptions){
                    var connection = $.hubConnection(serverUrl);
                    var proxy = connection.createHubProxy(hubName);

                    return {
                        start: function(){
                            connection.start(startOptions).done(function(){
                                Utility.connectionId=connection.id;
                                console.log('Now connected, connection ID='+Utility.connectionId);
                            }).fail(function(error){console.log('Connection Failed '+error)});
                        },
                        on: function(eventName,callback){
                            proxy.on(eventName,function(argu1,argu2){
                                $rootScope.$apply(function(){
                                    if(callback){
                                        callback(argu1,argu2);
                                    }
                                }) ;
                            });
                        },
                        off: function(eventName,callback){
                            proxy.off(eventName,function(argu1,argu2){
                                $rootScope.$apply(function(){
                                    if(callback){
                                        callback(argu1,argu2);
                                    }
                                });
                            });
                        },
                        invoke: function(methodName,argument,callback){

                            proxy.invoke(methodName,argument)
                                .done(function(result){
                                    $rootScope.$apply(function(){
                                        if(callback){
                                            callback(result);
                                        }
                                    });
                                });
                        }
                    }

                };
                return signalRHubProxyFactory;
            };

})
