define([
    'test/unit/baseTest',
    'app/scripts/services'], function(){
    'use strict';

    describe('Services: beacon.utility', function(){

        // load the controller's module
        beforeEach(module('beacon.services'));

        var beaconUtil;

        // Initialize the controller and a mock scope
        beforeEach(inject(['beacon.utility', function (_beaconUtility_) {
            beaconUtil = _beaconUtility_;
        }]));

        it('This is services unit test with requirejs', function () {
            expect(beaconUtil.modulePath).toEqual("modules/beacon/");
        });

    });
});


