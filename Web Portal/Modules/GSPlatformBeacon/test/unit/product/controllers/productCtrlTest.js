define([
    'test/unit/baseTest',
    'angularUIRouter',
    'app/scripts/services',
    'app/scripts/product/controllers/productsCtrl'], function(){
    'use strict';

    describe('Controller: productsCtrl', function(){

        // load the controller's module
        beforeEach(module('beacon.product'));
        beforeEach(module('beacon.services'));
        beforeEach(module('ui.router'));

        var productsCtrl, scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(['$controller','$rootScope','$state','beacon.utility', function ($controller, $rootScope, $state, _beaconUtil_) {
            scope = $rootScope.$new();
            productsCtrl = $controller('beacon.productsCtrl', {
                $scope: scope,
                $state: $state,
                'beacon.utility' : _beaconUtil_,
                'RestUtil' : {}
            });
        }]));

        it('This is product controller unit test with requirejs', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });

        it('This is product controller unit test with requirejs 2', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });

        it('This is product controller unit test with requirejs 3', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });

        it('This is product controller unit test with requirejs 4', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(3);
        });
    });
});


