'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var urlAuh = WS_ROOT_URL + 'auth/';

    service.user = {};
    // Get the user if exist in localstorage
    if(localStorage.getItem('user')) {
        service.user = JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Get the current user logged on the plateform
     * @returns {{name: string, firstname: string, email: string}}
     */
    service.getUser = function getUser() {
        return {
            name: 'Roussel',
            firstname: 'Guillaume',
            email: 'roussel.guillaume.gr@gmail.com'
        };
    };

    /**
     * Check if the user email and password are correct combination
     * @param email
     * @param password
     */
    service.authUser = function authUser(email, password) {
        var deferred = $q.defer();

        // Mock
        service.saveLocalStorage({
            name: 'Roussel',
            firstname: 'Guillaume',
            email: 'roussel.guillaume.gr@gmail.com'
        });

        deferred.resolve({
            user: service.getUser()
        });

        // No Mock
        //$http({
        //    url: urlAuh,
        //    data: {
        //        email: email,
        //        password: password
        //    }
        //}).then(function(response) {
        //    deferred.resolve(response.data);
        //}, function() {
        //    deferred.reject();
        //});

        return deferred.promise;
    };

    service.saveLocalStorage = function saveLocalStorage(user) {
        localStorage.setItem('user', JSON.stringify(user));
    };

    return service;
};
