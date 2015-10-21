'use strict';

describe('Controller : Auth - auth', function() {

    var controller;
    beforeEach(function() {
        module('heimdall');
    });

    beforeEach(inject(function (_$httpBackend_, _$controller_, _$state_, _account_, $templateCache, $compile, $rootScope) {
        _$httpBackend_.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test: 'test'});

        var scope = $rootScope.$new();

        controller = _$controller_('AuthController', { $state: _$state_, account: _account_ });

        var templateHtml = $templateCache.get('auth/partials/auth.html');
        var formElem = angular.element('<div>' + templateHtml + '</div>');

        $compile(formElem)(scope);
        scope.$digest();
    }));

    it('not debug', function() {
        expect(controller.user).toEqual({});
    });

    it('submit failed', function() {

        controller.user = {
            password: 'admin'
        };
//        controller.submit();

//        expect(controller.submit()).toEqual(null);
    });

});