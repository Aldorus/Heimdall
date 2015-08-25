'use strict';

/*@ngInject*/
module.exports = function ($rootScope, $state, account) {
    var service = {};

    service.init = function init() {
        service.checkAndRedirect($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            service.checkAndRedirect(toState.name);
        });
    };

    service.checkAndRedirect = function checkAndRedirect(stateName) {
        // Check if a user exist in the session
        if(!account.getUser() && stateName !== 'auth') {
            // If not we send the user on the auth page
            $state.go('auth');
        }
    };

    return service;
};