'use strict';

/*@ngInject*/
module.exports = function($scope, projects, account, builds) {

    $scope.newProject = {};

    projects.getProjects(account.getUser()).then(function(projects){
        $scope.projects = projects;
    });

    /**
     * Open the panel for create project
     */
    $scope.newProject = function newProject() {
        $scope.open = true;
    };

    /**
     * Close the panel for create project
     */
    $scope.closeProject = function closeProject() {
        $scope.open = false;
    };

    $scope.goBuild = function(build) {
        $state.go('build');
    };

    /**
     * Create project
     */
    $scope.createProject = function createProject() {

        if($scope.newProjectForm.$invalid) {
            return;
        }

        $scope.createLoading = true;
        projects.createProject($scope.newProject, account.getUser())
            .then(function(project) {

                // Build the build object to save
                var build = {
                    name: 'Default',
                    config: ''
                };
                builds.createBuild(build, project).then(function() {
                    $scope.createLoading = false;
                    $scope.open = false;

                }, function() {
                    $scope.createLoading = false;
                });
            }, function() {
                $scope.createLoading = false;
            });
    };
};
