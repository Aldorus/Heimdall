'use strict';

/*@ngInject*/
module.exports = function ($rootScope, $state, account) {
    var service = {};

    /**
     * Init the session service
     * This service listen all the change state, and check if the user has a current session
     * If the user has not session, he will be redirected to the auth state
     */
    service.init = function init() {
        service.checkAndRedirect($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            service.checkAndRedirect(toState.name);
        });
    };

    /**
     * Check the session and redirect the user to the auth
     * @param stateName
     */
    service.checkAndRedirect = function checkAndRedirect(stateName) {
        // Check if a user exist in the session
        if(!account.getUser() && stateName !== 'auth') {
            // If not we send the user on the auth page
            $state.go('auth');
        }
    };

    return service;
};
