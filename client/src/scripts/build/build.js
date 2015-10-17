'use strict';

angular.module('build', [])
    .controller('BuildController', require('./controllers/build.controller'))
    .service('builds', require('./services/builds'))
    .config(function ($stateProvider) {
        $stateProvider.state('build', {
            url: '/build/:buildId',
            templateUrl: 'build/partials/build.html',
            controller: 'BuildController',
            controllerAs: 'build',
            resolve: {
                build: function ($stateParams, builds) {
                    return builds.getBuildById($stateParams.buildId);
                }
            }
        });
    })
;

