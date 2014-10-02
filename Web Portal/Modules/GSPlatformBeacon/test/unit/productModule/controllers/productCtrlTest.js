define([
    'test/unit/baseTest',
    'app/scripts/productModule/controllers/productsCtrl'], function(){
    'use strict';

    describe('Controller: productsCtrl', function(){

        // load the controller's module
        beforeEach(module('beacon.productModule'));

        var productsCtrl, scope, state;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            productsCtrl = $controller('productsCtrl', {
                $scope: scope,
                $state: state,
                'beacon.utility' : {},
                'RestUtil' : {}
            });
        }));

        it('This is product controller unit test with requirejs', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });
        it('This is product controller unit test with requirejs', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });
        it('This is product controller unit test with requirejs', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(4);
        });
        it('This is product controller unit test with requirejs', function () {
            scope.repositories = {"repo1": [], "repo2": []};
            scope.myGroups = {"myGroup1": [], "myGroup2": []};
            productsCtrl.bootstrap();
            expect(scope.displayCards.length).toBe(3);
        });
    });
});


