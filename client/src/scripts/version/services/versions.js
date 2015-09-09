'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'versions/';
    var versions = [];

    /**
     * Get all versions for the project in params
     * @param project
     */
    service.getVersionsByProjects = function getVersionsByProjects(project) {
        var deferred = $q.defer();

        if(versions[project.id]) {
            deferred.resolve(versions[project.id]);
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
            versions[project.id] = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    /**
     * Only in cache memory
     */
    service.getAllVersions = function getAllVersions() {
        var agreVersions = [];

        for(var i = 0; i<versions.length; i++) {
            agreVersions.push(versions[i]);
        }
        return agreVersions;
    };

    return service;
};
