'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db.json');
var uuid = require('uuid');

var Project = {};

Project.save = function save(user) {
    if (user.id) {
        return db('project').chain().find({id: user.id}).assign(user).value();
    }

    user.id = uuid();
    db('project').push(user);

    return db('project').find({id: user.id});
};

Project.all = function all() {
    return db('project');
};

Project.get = function get(userId) {
    return db('project').find({id: userId});
};

Project.remove = function remove(userId) {
    return db('project').remove({id: userId});
};

module.exports = Project;
