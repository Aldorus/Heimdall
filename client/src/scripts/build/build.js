'use strict';

angular.module('build', [])
    .controller('BuildController', require('./controllers/build.controller.js'))
    .service('builds', require('./services/builds'))
    .config(function ($stateProvider) {
        $stateProvider.state('build', {
            url: '/build',
            templateUrl: 'build/partials/build.html',
            controller: 'BuildController',
            controllerAs: 'build'
        });
    })
;

