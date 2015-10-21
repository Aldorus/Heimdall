'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/auth.controller.js'))
    .service('account', require('./services/account.service.js'))
    .service('session', require('./services/session.service.js'))
    .run(function(session) {
        session.init();
    })
    .config(function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'app/auth/partials/auth.html',
            controller: 'AuthController',
            controllerAs: 'authCtrl'
        });
    })
;

