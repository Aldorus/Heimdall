'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/auth.controller'))
    .service('account', require('./services/account.service'))
    .service('session', require('./services/session.service'))
    .run(function(session) {
        session.init();
    })
    .config(function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'auth/partials/auth.html',
            controller: 'AuthController',
            controllerAs: 'auth'
        });
    })
;

