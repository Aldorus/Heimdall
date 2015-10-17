'use strict';

angular.module('project', [])
    .controller('ProjectController', require('./controllers/project.controller'))
    .service('projects', require('./services/projects'))
    .config(function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project',
            templateUrl: 'project/partials/project.html',
            controller: 'ProjectController',
            controllerAs: 'projectCtrl'
        });
    })
;

