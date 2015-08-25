'use strict';

/*@ngInject*/
module.exports = function ($q, account, projects, versions) {
    var service = {};

    /**
     * Init all the service
     */
    service.init = function init() {

        var deferred = $q.defer();
        var versionCpt = 0;

        projects.getProjects(account.getUser())
            .then(function (projects) {
                if(projects.length === 0) {
                    console.log('Projects are Loaded (empty)');
                    deferred.resolve();

                }
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    versions.getVersions(project)
                        .then(function() {
                            versionCpt++;
                            if(versionCpt >= projects.length) {
                                console.log('Project & Version are loaded');
                                deferred.resolve();
                            }
                        });
                }
            });


        return deferred.promise;
    };

    return service;
};

