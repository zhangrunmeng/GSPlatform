/**
 * Created by runmengz on 9/22/2014.
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

            var getDetails = function(tools){
                var details = [];
                for(var i=0; i<tools.length; i++){
                    if(tools[i].details)
                       details = details.concat(tools[i].details);
                }
                for(var i=0; i<details.length; i++){
                    details[i].message = code2message[details[i].code];
                }
                return details;
            }

            var updateRevision = function(repo, rev){
                for(var i=0; i < repo.revisions.length; i++){
                    if(repo.revisions[i].id === rev.id){
                        repo.revisions[i] = buildRevision(rev, repo.revisions[i].repository);
                        return repo.revisions[i];
                    }
                }
                var newrev = buildRevision(rev, repo);
                repo.revisions.push(newrev);
                return newrev;
            }

            var buildRevision = function(item, repository) {
                var revision = {};
                angular.extend(revision, item);
                revision.totalCount = getCount(item.tools, "items");
                revision.errorCount = getCount(item.tools, "errors");
                revision.warningCount = getCount(item.tools, "warnings");
                revision.details = getDetails(item.tools);
                revision.okCount = revision.totalCount - revision.errorCount - revision.warningCount;
                revision.revision = item.id;
                if(repository)
                    revision.repository = repository;
                return revision;
            }

            var buildRevisions = function(revisions, repository) {
                var result = revisions.map(function(item){
                    return buildRevision(item, repository);
                });
                return result;
            }

            var buildRepository = function(data){
                var repository = {};
                if(data.id){
                    var infos = data.id.split("_");
                    repository.id = data.id;
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

            var getRepoById = function(repos, id){
                for(var group in repos){
                    var repolist = repos[group];
                    for(var i=0; i<repolist.length; i++){
                        if(repolist[i].id == id)
                            return repolist[i];
                    }
                }
                return null;
            }

            var getRevisionById = function(repo, revId){
                for(var i=0; i<repo.revisions.length; i++){
                    if(repo.revisions[i].id == revId){
                        return repo.revisions[i];
                    }
                }
                return null;
            }

            var code2message = {
                1000: 'hardcoded string in source code',
                2000: 'missing key in localized resource file',
                2001: 'un-translated text in resource file',
                2002: 'duplicated key in resource file',
                2003: 'redundant key in localized but not in English resource file',
                2004: 'missing resource file',
                2005: 'undefined resource key used in source code',
                2006: 'unused key in resource file',
                2007: 'missing i18n resource file index',
                2008: 'redundant i18n resource file index',
                2014: 'resource file text not escaped correctly',
                3000: 'improper usage of locale sensitive function'
            }

            return {
                modulePath : "modules/beacon/",
                buildRepositories : buildRepositories,
                updateRevision : updateRevision,
                getRepoById : getRepoById,
                getRevisionById : getRevisionById,
                code2message : code2message
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