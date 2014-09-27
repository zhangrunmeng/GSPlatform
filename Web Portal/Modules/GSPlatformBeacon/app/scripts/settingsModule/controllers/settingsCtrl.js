/**
 * Created by runmengz on 9/26/2014.
 */
define(['angular',
        '../settingsModule'], function(
        angular,
        settingsModule){
        return settingsModule.controller('settingsCtrl', [
            '$scope',
            '$element',
            'beacon.utility',
            'RestUtil',
            function ($scope, $element, BeaconUtil, RestUtil) {

                $scope.addRepositories = function(e){
                    var sourceElement = angular.element(e.toElement);
                    var source = sourceElement.text().replace(/\s/g,'');
                    var target = angular.element(e.target).attr('heading');
                    if(source && target){
                        if($scope.repositories[source]){
                            //group
                            angular.forEach($scope.repositories[source], function(repo){
                                addNewRepository($scope.myGroups[target], repo, sourceElement, e);
                            });
                        } else {
                            //component
                            for(var name in $scope.repositories){
                                for(var i=0; i < $scope.repositories[name].length; i++){
                                    var repo = $scope.repositories[name][i];
                                    if(repo.shortname == source){
                                        addNewRepository($scope.myGroups[target], repo, sourceElement, e);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }

                $scope.addNewGroup = function(evt){
                    var name = $scope.groupToAdd.name
                    $scope.myGroups[name] = [];
                    $scope.myGroupsList.push({name: name, repositories: $scope.myGroups[name]});
                }

                var addNewRepository = function(targetGroup, repo, sourceElement, e){
                    var sourceGroup;
                    if(sourceElement.hasClass('in-my-groups')){
                        sourceGroup = $scope.myGroups[findGroupName(sourceElement)];
                        for(var i=0; i < sourceGroup.length; i++){
                            if(sourceGroup[i] == repo){
                                sourceGroup.splice(i, 1);
                                if(!$scope.$$phase)
                                    $scope.$apply();
                                break;
                            }
                        }
                    }
                    var found = targetGroup.indexOf(repo) != -1;
                    if(!found) {
                        targetGroup.push(repo);
                    } else if(sourceGroup){
                        //Add it back if target is not accepted
                        sourceGroup.push(repo);
                    }
                }

                var findGroupName = function(element){
                    while(element.attr('heading') == undefined){
                        element = element.parent();
                    }
                    return element.attr('heading');
                }

                var bootstrap = function(){
                    $scope.predefinedGroupsList = [];
                    $scope.myGroupsList = [];
                    $scope.configEdit = false;
                    $scope.groupToAdd = {name : "My Group"};
                    for(var key in $scope.repositories){
                        $scope.predefinedGroupsList.push({name : key, repositories: $scope.repositories[key]});
                    }
                    for(var key in $scope.myGroups){
                        $scope.myGroupsList.push({name : key, repositories: $scope.myGroups[key]});
                    }
                }
                $scope.$on('bootstrap', bootstrap);
                $scope.$emit('setCurrentView', 'Group Management');

                bootstrap();
            }]);
        }
);