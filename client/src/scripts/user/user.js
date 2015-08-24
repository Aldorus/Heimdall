'use strict';

angular.module('user', [])
    .controller('UserController', require('./controllers/UserController'))
    .config(function ($stateProvider) {
        $stateProvider.state('user', {
            url: '/user',
            templateUrl: 'user/partials/user.html',
            controller: 'UserController'
        });
    })
;

