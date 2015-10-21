'use strict';

/*@ngInject*/
module.exports = function(build) {
    this.build = build;

    // TODO Mock
    this.build.config = {
        nodes: [
            {
                id: 1,
                name: 'Test1',
                output: 2
            },
            {
                id: 2,
                name: 'Test2',
                output: 3,
                parent: 1
            },
            {
                id: 3,
                name: 'Test3',
                output: 0,
                parent: 2
            },
            {
                id: 4,
                name: 'Test4',
                output: 0,
                parent: 1
            }
        ]
    };

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
