'use strict';

/*@ngInject*/
module.exports = function($state, projects, account, builds) {
    var self = this;

    self.newProject = {};

    projects.getProjects(account.getUser()).then(function(projects){
        self.projects = projects;
    });

    self.getBuildsByProject = function getBuildsByProject(project) {
        builds.getBuildsByProject(project).then(function(builds) {
            project.builds = builds;
        });
    };

    /**
     * Open the panel for create project
     */
    self.newProject = function newProject() {
        self.open = true;
    };

    /**
     * Close the panel for create project
     */
    self.closeProject = function closeProject() {
        self.open = false;
    };

    self.goBuild = function(build) {
        $state.go('build', {
            buildId: build.id
        });
    };

    /**
     * Create project
     */
    self.createProject = function createProject() {

        if(self.newProjectForm.$invalid) {
            return;
        }

        self.createLoading = true;
        projects.createProject(self.newProject, account.getUser())
            .then(function(project) {

                // Build the build object to save
                var build = {
                    name: 'Default',
                    config: ''
                };
                builds.createBuild(build, project).then(function() {
                    self.createLoading = false;
                    self.open = false;

                }, function() {
                    self.createLoading = false;
                });
            }, function() {
                self.createLoading = false;
            });
    };

    return self;
};
