'use strict';

angular.module('build', [])
    .controller('BuildController', require('./controllers/BuildController'))
    .service('builds', require('./services/builds'))
    .config(function ($stateProvider) {
        $stateProvider.state('build', {
            url: '/build/:buildId',
            templateUrl: 'build/partials/build.html',
            controller: 'BuildController',
            resolve: {
                build: function ($stateParams, builds) {
                    return builds.getBuildById($stateParams.buildId);
                }
            }
        });
    })
;

