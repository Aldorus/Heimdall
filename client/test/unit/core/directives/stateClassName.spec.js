/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

describe('Directive:stateClassName', function () {
    var elm, scope, $httpBackend;

    beforeEach(module('heimdall'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({});
    }));

    beforeEach(inject(function($rootScope, $compile, $injector) {
        elm = angular.element('<div state-class-name></div>');

        scope = $rootScope;
        scope.defined = false;

        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should not be initially defined', function() {
        expect(elm.scope().$$childTail.isDefined()).toBe(false);
    });
});
