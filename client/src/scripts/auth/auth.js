'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/AuthController'))
    .service('account', require('./services/account'))
    .config(function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'auth/partials/auth.html',
            controller: 'AuthController'
        });
    })
;

