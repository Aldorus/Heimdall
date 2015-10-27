/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

describe('Directive:bubbleNode', function () {
    var element, $rootScope, $httpBackend, $state, $compile;

    beforeEach(module('heimdall'));

    beforeEach(inject(function (_$httpBackend_, _$state_, _$rootScope_, _$compile_) {
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $httpBackend.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test:'test'});

    }));

    beforeEach(function() {
        element = $compile('<div><bubble-node></bubble-node></div>')($rootScope);
        $rootScope.$digest();
    });

    it('should be initialized', function() {
        expect(element.hasClass('ng-scope')).toBe(true);
    });
});
