'use strict';

/*@ngInject*/
module.exports = function ($q, account, projects, versions, builds, users) {
    var service = {};

    /**
     * Load all the data
     * @returns {Promise}
     */
    service.init = function init() {

        var deferred = $q.defer();

        var projectsLoaded = false;
        var usersLoaded = false;

        service.loadProject().then(function () {
            projectsLoaded = true;
            if(usersLoaded) {
                deferred.resolve();
            }
        });

        service.loadUsers().then(function() {
            usersLoaded = true;
            if(projectsLoaded) {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    service.loadProject = function loadProject() {
        var deferred = $q.defer();
        var versionsOk = false;
        var buildsOk = false;

        projects.getProjects(account.getUser())
            .then(function (projects) {
                if (projects.length === 0) {
                    console.log('Projects are Loaded (empty)');
                    deferred.resolve();
                }

                service.loadVersions(projects).then(function() {
                    versionsOk = true;
                    if(buildsOk) {
                        deferred.resolve();
                    }
                });

                service.loadBuilds(projects).then(function() {
                    buildsOk = true;
                    if(versionsOk) {
                        deferred.resolve();
                    }
                });
            });
        return deferred.promise;
    };

    /* jshint ignore:start */
    service.loadBuilds = function loadBuilds(projects) {
        var deferred = $q.defer();

        var projectCpt = 0;
        for (var i = 0; i < projects.length; i++) {

            builds.getBuildsByProject(projects[i])
                .then(function () {
                    projectCpt++;
                    if (projectCpt >= projects.length) {
                        console.log('Builds are loaded');
                        deferred.resolve();
                    }
                });
        }

        return deferred.promise;
    };
    /* jshint ignore:end */

    /* jshint ignore:start */
    service.loadVersions = function loadVersions(projects) {
        var deferred = $q.defer();

        var projectCpt = 0;
        for (var i = 0; i < projects.length; i++) {
            versions.getVersionsByProjects(projects[i])
                .then(function () {
                    projectCpt++;
                    if (projectCpt >= projects.length) {
                        console.log('Versions are loaded');
                        deferred.resolve();
                    }
                });

        }
        return deferred.promise;
    };
    /* jshint ignore:end */

    service.loadUsers = function loadUsers() {
        var deferred = $q.defer();
        users.getUsers().then(function(){
            console.log('Users are loaded');
            deferred.resolve();
        });
        return deferred.promise;
    };

    return service;
};

