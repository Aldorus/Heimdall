'use strict';

describe('Service: auth - session', function() {
    var $httpBackend, account, $state, session;

    beforeEach(module('heimdall'));

    beforeEach(inject(function (_$httpBackend_, _session_, _account_,_$state_) {
        $httpBackend = _$httpBackend_;
        account = _account_;
        session = _session_;
        $state = _$state_;
        $httpBackend.when(
            'GET',
            'i18n/fr_FR.json'
        ).respond({test: 'test'});

        spyOn($state, 'go');
    }));

    it('checkAndRedirect:failed', function() {
        session.checkAndRedirect('test');
        expect($state.go).toHaveBeenCalledWith('auth');
    });

    it('checkAndRedirect:failed', function() {
        session.checkAndRedirect('auth');
        expect($state.go).not.toHaveBeenCalledWith('auth');
    });

    it('checkAndRedirect:success', function() {
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

        session.checkAndRedirect('test');
        expect($state.go).not.toHaveBeenCalledWith('auth');
    });
});