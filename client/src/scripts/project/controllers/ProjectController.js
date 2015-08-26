'use strict';

/*@ngInject*/
module.exports = function($scope, projects, account) {

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

    /**
     * Create project
     */
    $scope.createProject = function createProject() {

        if($scope.newProjectForm.$invalid) {
            return;
        }

        $scope.createLoading = true;
        projects.createProject(account.getUser(), $scope.newProject)
            .then(function() {
                $scope.createLoading = false;
                $scope.open = false;
            }, function() {
                $scope.createLoading = false;
            });
    };
};
