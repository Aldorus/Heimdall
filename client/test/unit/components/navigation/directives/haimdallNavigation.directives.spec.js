/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

describe('Directive:heimdallNavigation', function () {
    var element, $scope, $state, $compile, account, controller;

    beforeEach(module('heimdall'));

    beforeEach(inject(function (_$state_, _$httpBackend_, _$rootScope_, _$compile_, _account_) {
        $state = _$state_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        account = _account_;
        _$httpBackend_.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test:'test'});
    }));

    beforeEach(function() {
        element = $compile('<heimdall-navigation></heimdall-navigation>')($scope);
        $scope.$digest();
        controller = element.controller('heimdallNavigation');
    });


    it('should be initialized', function() {
        expect(element.length).toBe(1);
    });

    it('navigationActive is true', function(){
        $state.go('home');
        expect(controller.navigationActive()).toEqual(true);
    });

    it('navigationActive is false', function(){
        $state.go('auth');
        expect(controller.navigationActive()).toEqual(true);
    });
});
