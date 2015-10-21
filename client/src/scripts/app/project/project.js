'use strict';

angular.module('project', [])
    .controller('ProjectController', require('./controllers/project.controller.js'))
    .service('projects', require('./services/projects'))
    .config(function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project',
            templateUrl: 'app/project/partials/project.html',
            controller: 'ProjectController',
            controllerAs: 'projectCtrl'
        });
    })
;

