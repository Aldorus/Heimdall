'use strict';

/*@ngInject*/
module.exports = function($scope, build) {
    $scope.build = build;

    /**
     * Open the panel for create project
     */
    $scope.newBuild = function newBuild() {
        $scope.open = true;
    };

    /**
     * Close the panel for create project
     */
    $scope.closeBuild = function closeBuild() {
        $scope.open = false;
    };
};
