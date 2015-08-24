'use strict';

angular.module('project', [])
    .controller('ProjectController', require('./controllers/ProjectController'))
    .config(function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project',
            templateUrl: 'project/partials/project.html',
            controller: 'ProjectController'
        });
    })
;

