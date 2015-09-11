'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db-build.json');
var uuid = require('uuid');

var Build = {};

Build.save = function save(build) {
    if (build.id) {
        return db('build').chain().find({id: build.id}).assign(build).value();
    }

    build.id = uuid();
    db('build').push(build);

    return db('build').find({id: build.id});
};

Build.all = function all() {
    return db('build');
};

Build.get = function get(buildId) {
    return db('build').find({id: buildId});
};

Build.getByProject = function getByProject(projectId) {
    return db('build').find({projectId: projectId});
};

Build.remove = function remove(buildId) {
    return db('build').remove({id: buildId});
};


module.exports = Build;
