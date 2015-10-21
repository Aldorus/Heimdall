'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'builds/';
    var builds = [];

    /**
     * Get all builds for the project in params
     * @param project
     */
    service.getBuildsByProject = function getBuildsByProject(project) {
        var deferred = $q.defer();

        if (builds[project.id]) {
            deferred.resolve(builds[project.id]);
            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: url,
            params: {
                projectId: project.id
            }
        }).then(function (response) {
            builds[project.id] = response.data;
            deferred.resolve(response.data);
        }, function () {

        });

        return deferred.promise;
    };

    service.getBuildById = function getBuildById(buildId) {
        var deferred = $q.defer();

        // Search in cache
        var cachedBuild = service.getBuildByIdInCache(buildId);

        if (cachedBuild) {
            console.log(cachedBuild);
            deferred.resolve(cachedBuild);
            return deferred.promise;
        }

        // Otherwise we call the API
        $http({
            method: 'GET',
            url: url + buildId
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function () {

        });

        return deferred.promise;
    };

    service.getBuildByIdInCache = function getBuildByIdInCache(buildId) {
        var builds = service.getAllBuilds();
        for(var i = 0; i<builds.length; i++) {
            if(builds[i].id === buildId) {
                return builds[i];
            }
        }
    };

    /**
     * Only in cache memory
     */
    service.getAllBuilds = function getAllBuilds() {
        var agreBuilds = [];
        for (var i = 0; i < builds.length; i++) {
            agreBuilds.push(builds[i]);
        }
        return agreBuilds;
    };

    service.createBuild = function createBuild(build, project) {
        var deferred = $q.defer();

        build.projectId = project.id;

        $http({
            method: 'POST',
            url: url,
            data: build
        }).then(function (response) {
            deferred.resolve(response.data);
            builds.push(response.data);
        }, function () {
        });

        return deferred.promise;
    };

    return service;
};
