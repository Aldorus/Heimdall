'use strict';

angular.module('version', [])
    .controller('VersionController', require('./controllers/VersionController'))
    .service('versions', require('./services/versions'))
    .config(function ($stateProvider) {
        $stateProvider.state('version', {
            url: '/version',
            templateUrl: 'partials/version.html',
            controller: 'VersionController'
        });
    })
;

