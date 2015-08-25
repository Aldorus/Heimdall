'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/AuthController'))
    .service('account', require('./services/account'))
    .service('session', require('./services/session'))
    .run(function(session) {
        session.init();
    })
    .config(function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'auth/partials/auth.html',
            controller: 'AuthController'
        });
    })
;

