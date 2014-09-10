var myApp = angular.module('fileUploader', []);

myApp.controller('fileUploaderCtrl', function ($scope, $http) {
    $scope.name = 'Superhero';
});

myApp.directive('fileUploader', function ($http) {
    return {
        restrict: 'E',
        scope : true,
        template: '<form ng-submit="upload()"><div><input name="file" type="file" multiple/><input type="submit"/></div>'
        + '<ul><li ng-repeat="file in files"> - </li></ul></form>',
        link: function (scope, $element) {
            var fileInput = angular.element($element.find('input')[0]);
            fileInput.bind('change', function (e) {
                scope.notReady = e.target.files.length == 0;
                scope.files = [];
                for (i in e.target.files) {
                    //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                    if (typeof e.target.files[i] == 'object') scope.files.push(e.target.files[i]);
                }
            });
            scope.upload = function () {
                var fd = new FormData();
                for (var i = 0; i < scope.files.length; i++) {
                    fd.append('file' + i, scope.files[i]);
                }
                $http({
                    method: 'POST',
                    url: '../api/app/install',
                    data: fd,  // pass in data as strings
                    headers: { 'Content-Type': undefined },  // set the headers so angular passing info as form data (not request payload)
                    transformRequest: angular.identity
                }).success(function (data) {
                    console.log(data);
                });
            };
        }
    }
});

myApp.service('$fileUpload', ['$http', function ($http) {
    this.upload = function (files) {
        //Not really sure why we have to use FormData().  Oh yeah, browsers suck.
        var formData = new FormData();
        for (i in files) {
            formData.append('file_' + i, files[i]);
        }
        console.log(formData);
        $http({ method: 'POST', url: '../api/upload', data: formData, headers: { 'Content-Type': 'multipart/form-data' }, transformRequest: angular.identity })
        .success(function (data, status, headers, config) {

        });
    }
}]);

myApp.factory('formDataObject', function () {
    return function (data) {
        var fd = new FormData();
        angular.forEach(data, function (value, key) {
            fd.append(key, value);
        });
        return fd;
    };
});