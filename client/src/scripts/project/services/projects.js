'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'projects/';
    var projects;

    service.getProjects = function getProjects(user) {
        var deferred = $q.defer();

        if(projects) {
            deferred.resolve(projects);
        }

        $http({
            method: 'GET',
            url: url,
            data: {
                /*jshint camelcase:false*/
                user_id: user.id
            }
        }).then(function(response) {
            projects = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    service.createProject = function createProject(user, project) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: url,
            data: {
                /*jshint camelcase:false*/
                admin_id: user.id,
                title: project.title
            }
        }).then(function(response) {
            deferred.resolve(response.data);
            projects.push(response.data);
        }, function() {
        });

        return deferred.promise;
    };

    return service;
};