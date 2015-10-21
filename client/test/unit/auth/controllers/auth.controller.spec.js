'use strict';

describe('Controller : Auth - auth', function() {

    var controller, scope, $state, form, $httpBackend,account;
    beforeEach(function() {
        module('heimdall');
    });

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        _$httpBackend_.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test: 'test'});
    }));

    beforeEach(inject(function($controller, $rootScope, $templateCache, $compile, _$state_, _account_) {
        scope = $rootScope.$new();
        $state = _$state_;
        account = _account_;

        controller = $controller('AuthController', {$scope: scope, $state: $state, account: account});

        var templateHtml = $templateCache.get('auth/partials/auth.html');
        var formElem = angular.element('<div>' + templateHtml + '</div>');

        $compile(formElem)(scope);
        form = scope.authForm;
        scope.$digest();

    }));

    it('not debug', function() {
        expect(scope.user).toEqual({});
    });

    it('submit failed - form invalid', function() {

        controller.user = {
            password: 'admin'
        };
        controller.submit();
        expect(controller.submit()).toEqual(undefined);
    });

    it('submit failed - form error', function() {

        controller.user = {
            email: 'admin@peashooter.test',
            password: 'admin'
        };
        controller.submit();
        expect(controller.submit()).toEqual(undefined);
    });

//    it('submit success', function() {
//        spyOn(account, 'authUser').andCallThrough();
//
//        form.email.$setViewValue('admin@peashooter.com');
//        form.password.$setViewValue('admin');
//        scope.$apply();
//        controller.submit();
//        scope.$apply();
//        expect(account.authUser).toHaveBeenCalledWith('admin@peashooter.com', 'admin');
//    });

});