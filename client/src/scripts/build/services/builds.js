'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'builds/';
    var builds = [];

    /**
     * Get all builds for the project in params
     * @param project
     */
    service.getBuildsByProject = function getBuildsByProject(project) {
        var deferred = $q.defer();

        if(builds[project.id]) {
            deferred.resolve(builds[project.id]);
            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: url,
            params: {
                /*jshint camelcase:false*/
                projectId: project.id
            }
        }).then(function(response) {
            builds[project.id] = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    /**
     * Only in cache memory
     */
    service.getAllBuilds = function getAllBuilds() {
        var agreBuilds = [];

        for(var i = 0; i<builds.length; i++) {
            agreBuilds.push(builds[i]);
        }
        return agreBuilds;
    };

    return service;
};
