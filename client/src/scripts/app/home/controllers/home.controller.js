'use strict';

/*@ngInject*/
module.exports = function(projects, versions, builds) {
    var self = this;
    // Get count project
    projects.getProjects().then(function(projects) {
        console.log('here');
        self.countProject = projects.length;
        if(self.countProject) {
            self.countVersion = versions.getAllVersions().length / self.countProject * 100 / 100;
            self.countBuild = builds.getAllBuilds().length / self.countProject;
        } else {
            self.countVersion = 0;
            self.countBuild = 0;
        }
    });

    return self;
};
