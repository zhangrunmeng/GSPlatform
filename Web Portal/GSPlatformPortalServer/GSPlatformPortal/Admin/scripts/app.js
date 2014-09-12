/**
 * Created by runmengz on 9/10/2014.
 */
angular.module("webPortalAdmin", ['ngGrid', 'ui.bootstrap', 'ngMessages'])
    .controller('moduleManageCtrl', function($scope, $http, $modal){
        $scope.selectedModule = [];
        $scope.installedModules = [];
        $scope.modulePagingOptions = {
            pageSizes: [20, 50, 100],
            pageSize: 20,
            currentPage: 1
        };
        $scope.totalModules = $scope.installedModules.length;
        $scope.moduleGridOptions = {
            data : 'installedModules',
            columnDefs: [
                {field:'name', displayName: 'Module', width: "40%"},
                {field:'version', displayName:'Version', width: "15%"},
                {field:'time', displayName:'Update Time', width: "30%"},
                {field:'', displayName:'Action', width: "*", cellTemplate: "templates/moduleActions.html"}
            ],
            enableColumnReordering : true,
            enablePaging: false,
            showFooter: false,
            totalServerItems : 'totalModules',
            pagingOptions: $scope.modulePagingOptions,
            selectedItems : $scope.selectedModule,
            showSelectionCheckbox : false,
            multiSelect : false
        };

        $scope.installModule = function(){
            popupModal("templates/uploadModule.html");
        }

        $scope.upgradeModule = function(module){
            popupModal("templates/uploadModule.html", module);
        };

        $scope.uninstallModule = function(module){
            $http({
                method: "DELETE",
                url: "/api/app/" + module.id
            }).success(function(data){
                if(data != undefined && data.toLowerCase() == "success"){
                    for(var i=0; i < $scope.installedModules.length; i++){
                        if($scope.installedModules[i].id == module.id){
                            $scope.installedModules.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        };

        var popupModal = function(template, module){
            $modal.open({
                templateUrl: "templates/uploadModule.html",
                controller: ModalInstanceCtrl,
                resolve: {
                    module : function(){
                        return module;
                    },
                    modules : function(){
                        return $scope.installedModules;
                    }
                }
            });
        };

        $http({
            method: "GET",
            url: "/api/app"
        }).success(function(data){
            $scope.installedModules = data;
            $scope.totalModules = $scope.installedModules.length;
        });

    })
    .directive('moduleFormChecker', function(){
        return {
            require:'ngModel',
            restrict: 'A',
            link: function postLink(scope, element, attrs, ngModelController) {
                scope.$on("error", function(evt, key, value){
                    if(angular.isUndefined(key)){
                        return;
                    }
                    ngModelController.$setValidity(key, value);
                });
            }
        };
    })
    .directive('fileUploader', function ($http) {
        return {
            restrict: 'E',
            scope : true,
            template: '<button class="btn"><i class="fa fa-upload"><input type="file" class="fileInput"></i></button>',
            link: function (scope, $element) {
                var fileInput = angular.element($element.find('input')[0]);
                fileInput.bind('change', function (e) {
                    scope.notReady = e.target.files.length == 0;
                    scope.files = [];
                    for (var i in e.target.files) {
                        //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                        if (typeof e.target.files[i] == 'object') scope.files.push(e.target.files[i]);
                    }
                    scope.$emit('fileChange', scope.files);
                });
            }
        }
    });

    var ModalInstanceCtrl = function ($scope, $modalInstance, $http, module, modules) {

        var me = this;

        if(module != null){
            $scope.title = "Upgrade Module"
        } else {
            $scope.title = "Install Module"
        }
        this._isUpgrade = (module != null);

        $scope.module = module || {};
        $scope.submit = function (isValid) {
            if(isValid && !me._getInfoLock){
                installModule(function(){
                    if(!me._isUpgrade && modules){
                        modules.push($scope.module);
                    }
                    $modalInstance.dismiss('cancel');
                });
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.$on('fileChange', function(evt, files){
            if(files.length > 0){
                $scope.module.fileName = files[0].name;
                this.localfile = files[0];
                if(!$scope.$$phase){
                    $scope.$apply();
                }
                getModuleInfo(this.localfile);
            }
        });

        var getModuleInfo = function(localfile){
            me._getInfoLock = true;
            postFile(localfile, '', function(data){
                me._getInfoLock = false;
                if(me._isUpgrade){
                    if(data.id != $scope.module.id){
                        $scope.upgradeModuleId = data.id;
                        $scope.$broadcast('error', 'sameModuleId', false);
                        return;
                    } else {
                        $scope.$broadcast('error', 'sameModuleId', true);
                    }
                }
                angular.copy(data, $scope.module);
                $scope.module.fileName = localfile.name;
            });
        };

        var installModule = function (callback) {
            $http({
                method: 'GET',
                url: '/api/app/install/' + $scope.module.file
            }).success(function (data) {
                console.log(data);
                if(callback){
                    callback();
                }
            });
        };

        var postFile = function(file, url, callback){
            var fd = new FormData();
            fd.append('file', file);
            $http({
                method: 'POST',
                url: '/api/app/' + url,
                data: fd,  // pass in data as strings
                headers: { 'Content-Type': undefined },  // set the headers so angular passing info as form data (not request payload)
                transformRequest: angular.identity
            }).success(function (data) {
                console.log(data);
                if(callback){
                    callback(data);
                }
            });
        };
    };
