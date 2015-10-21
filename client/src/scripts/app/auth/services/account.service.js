'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var urlAuh = WS_ROOT_URL + 'users/auth/';
    var user;

    // Get the user if exist in localstorage
    if(localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Get the current user logged on the platform
     * @returns {{name: string, firstname: string, email: string}}
     */
    service.getUser = function getUser() {
        return user;
    };

    /**
     * Check if the user email and password are correct combination
     * @param email
     * @param password
     */
    service.authUser = function authUser(email, password) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: urlAuh,
            data: {
                email: email,
                password: password
            }
        }).then(function(response) {
            service.saveLocalStorage(response.data);
            deferred.resolve(response.data);
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    /**
     * Save the user in params into the localStorage
     * @param userToSave
     */
    service.saveLocalStorage = function saveLocalStorage(userToSave) {
        delete userToSave.password;
        user = userToSave;
        localStorage.setItem('user', JSON.stringify(userToSave));
    };

    /**
     * Destroy the user in the service AND in the localStorage
     */
    service.logout = function logout() {
        localStorage.removeItem('user');
        user = undefined;
    };

    return service;
};
