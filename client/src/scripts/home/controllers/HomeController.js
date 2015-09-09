'use strict';

/*@ngInject*/
module.exports = function($scope, projects, versions, builds) {

    // Get count project
    projects.getProjects().then(function(projects) {
        $scope.countProject = projects.length;
        if($scope.countProject) {
            $scope.countVersion = versions.getAllVersions().length / $scope.countProject;
            $scope.countBuild = builds.getAllBuilds().length / $scope.countProject;
        } else {
            $scope.countVersion = 0;
            $scope.countBuild = 0;
        }
    });
};
