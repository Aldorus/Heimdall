'use strict';

/*@ngInject*/
module.exports = function(build) {
    this.build = build;

    /**
     * Open the panel for create project
     */
    this.newBuild = function newBuild() {
        this.open = true;
    };

    /**
     * Close the panel for create project
     */
    this.closeBuild = function closeBuild() {
        this.open = false;
    };

    return this;
};
