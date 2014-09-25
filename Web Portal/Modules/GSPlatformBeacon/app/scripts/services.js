/**
 * Created by runmengz on 9/22/2014.
 */
/**
 * Created by hammer on 2014/8/31.
 *
 * Services, Filters and Directives are required to return an object or function, so
 * they must be loaded in sync way, by runmeng 8/31
 */

define(['angular'], function(angular){
    angular.module("beacon.services", [])
        .factory('beacon.utility', function(){
            var getCount = function(data, key) {
                return data.reduce(function(previousValue, tool) {
                    var ref;
                    return (ref = previousValue + tool[key]) != null ? ref : previousValue;
                }, 0);
            }

            var buildRevisions = function(revisions, repository) {
                var result = revisions.map(function(item){
                    var revision = {};
                    angular.extend(revision, item);
                    revision.totalCount = getCount(item.tools, "items");
                    revision.errorCount = getCount(item.tools, "errors");
                    revision.warningCount = getCount(item.tools, "warnings");
                    revision.okCount = revision.totalCount - revision.errorCount - revision.warningCount;
                    revision.revision = item.id;
                    if(repository == undefined && item.repository != undefined){
                        repository = buildRepository(item.repository);
                    }
                    revision.repository = repository;
                    return revision;
                });
                return result;
            }

            var buildRepository = function(data){
                var repository = {};
                if(data.id){
                    var infos = data.id.split("_");
                    repository.product = infos[0];
                    repository.release = infos[1];
                    repository.component = infos[2];
                    repository.group = infos[0] + '_' + infos[1];
                    repository.shortname = infos[1] + '_' + infos[2];
                    repository.revisions = buildRevisions(data.revisions, repository);
                    repository.lastRevision = repository.revisions[repository.revisions.length - 1];
                }
                return repository;
            }

            var buildRepositories = function(data){
                var groups = {};
                var repositories = data.map(function(item){
                    return buildRepository(item);
                });
                angular.forEach(repositories, function(repo){
                    if(!groups[repo.group]){
                        groups[repo.group] = [];
                    }
                    groups[repo.group].push(repo);
                });
                return groups;
            }
            return {
                modulePath : "modules/beacon/",
                buildRepositories : buildRepositories
            };
        })
        .provider('beacon', function(){
            return {
                modulePath : "modules/beacon/",
                $get : function(){
                    return {modulePath : "modules/beacon/"};
                }
            }
        });

});