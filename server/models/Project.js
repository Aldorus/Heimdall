'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db-project.json');
var uuid = require('uuid');

var Project = {};

Project.save = function save(project) {
    if (project.id) {
        return db('project').chain().find({id: project.id}).assign(user).value();
    }

    project.id = uuid();
    db('project').push(project);

    return db('project').find({id: project.id});
};

Project.all = function all() {
    return db('project');
};

Project.get = function get(projectId) {
    return db('project').find({id: projectId});
};

Project.remove = function remove(projectId) {
    return db('project').remove({id: projectId});
};

module.exports = Project;
