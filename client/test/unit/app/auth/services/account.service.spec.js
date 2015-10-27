'use strict';

describe('Service: auth - account', function () {
    var $httpBackend, account;

    beforeEach(module('heimdall'));

    beforeEach(inject(function (_$httpBackend_, _account_) {
        $httpBackend = _$httpBackend_;
        account = _account_;
        $httpBackend.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test: 'test'});
    }));

    it('auth method', function() {
        $httpBackend.whenPOST(account.urlAuh).respond(
            {name:'Admin',email:'admin@peashooter.com',password:'admin',role:'admin',id:'dac1e54d-6397-4fea-9f0a-9f27edc1e7a7'}
        );
        account.authUser({
            email: 'admin@peashooter.com',
            password: 'admin'
        }).then(function(data) {
            expect(data.name).toEqual('Admin');
        });
        $httpBackend.flush();
    });

    it('getUser method', function() {
        var user = account.getUser();
        expect(user).toEqual({name:'Admin',email:'admin@peashooter.com',role:'admin',id:'dac1e54d-6397-4fea-9f0a-9f27edc1e7a7'});
    });

    it('saveLocalStorage', function() {
        account.saveLocalStorage({name:'Admin Test',email:'admin@peashooter.com',role:'admin',id:'dac1e54d-6397-4fea-9f0a-9f27edc1e7a7'});
        var user = account.getUser();
        expect(user).toEqual({name:'Admin Test',email:'admin@peashooter.com',role:'admin',id:'dac1e54d-6397-4fea-9f0a-9f27edc1e7a7'});
    });

    it('logout', function() {
        account.logout();
        var user = account.getUser();
        expect(user).toEqual(undefined);
    });
});