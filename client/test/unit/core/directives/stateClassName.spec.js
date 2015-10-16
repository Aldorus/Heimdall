/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

describe('Directive:stateClassName', function () {
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
        element = $compile("<div state-class-name></div>")($rootScope);
        $rootScope.$digest();

        spyOn($rootScope.$new(), '$broadcast').andCallThrough();
    });

    it('should be page-root', function() {
        expect(element.hasClass('page-root')).toBe(true);
    });

    it('after redirect should be page-auth', function() {
        $rootScope.$broadcast("$stateChangeStart", [{}, {name:'auth'}]);
        console.log(element);
        expect(element.hasClass('page-auth')).toBe(true);
    });
});
