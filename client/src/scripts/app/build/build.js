'use strict';

angular.module('build', [])
    .controller('BuildController', require('./controllers/build.controller.js'))
    .service('builds', require('./services/builds'))
    .config(function ($stateProvider) {
        $stateProvider.state('build', {
            url: '/build/:buildId',
            templateUrl: 'partials/build.html',
            controller: 'BuildController',
            controllerAs: 'buildCtrl',
            resolve: {
                build: function ($stateParams, builds) {
                    return builds.getBuildById($stateParams.buildId);
                }
            }
        });
    })
;

