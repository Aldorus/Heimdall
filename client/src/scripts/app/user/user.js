'use strict';

angular.module('user', [])
    .controller('UserController', require('./controllers/UserController'))
    .controller('RemoveUserController', require('./controllers/RemoveUserController'))
    .service('users', require('./services/users'))
    .config(function ($stateProvider) {
        $stateProvider.state('user', {
            url: '/user',
            templateUrl: 'app/user/partials/user.html',
            controller: 'UserController'
        });
    })
;

