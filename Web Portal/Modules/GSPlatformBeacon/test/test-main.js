window.$theme = 'default';

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
    // Normalize paths to RequireJS module names.
    // console.log(file);

    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(pathToModule(file));
    }
});

var root = 'lib/';

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths : {
      'angular': root + 'angular/angular',
      'jquery' : root + 'jquery/dist/jquery',
      'jqueryui': root + 'jquery-ui/jquery-ui',
      'angularMocks': root + 'angular-mocks/angular-mocks',
      'angularDnD' : root + 'angular-dragdrop/src/angular-dragdrop',
      'angularGrid' : root + 'angular-grid/ng-grid-2.0.12.debug',
      'restAngular' : root + 'restangular/dist/restangular',
      'lodashCompat' : root + 'lodash/dist/lodash.compat'
    },

    shim: {
        'angular' : {'exports' : 'angular'},
//        'angularRoute': ['angular'],
//        'angularUIRoute': ['angular'],
//        'angularUIRouteHelper': ['angular', '  '],
//        'angularMessage' : ['angular'],
        'angularGrid' : ['angular', 'jquery', 'lodashCompat'],
        'restAngular' : ['angular', 'lodashCompat'],
        'angularDnD' : ['angular', 'jquery', 'jqueryui'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    map: {
        '*': {
            'css': root + 'require-css/css' // or whatever the path to require-css is
        }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start

});

require(['angular'], function(angular){
    'use strict';
    angular.module('beacon',[]);
    angular.module('beacon.productModule',[]);
    angular.module('beacon.revisionsModule',[]);
    angular.module('beacon.settingsModule',[]);
});