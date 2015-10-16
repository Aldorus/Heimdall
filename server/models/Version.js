'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db-version.json');
var uuid = require('uuid');

var Version = {};

Version.save = function save(user) {
    if (user.id) {
        return db('version').chain().find({id: user.id}).assign(user).value();
    }

    user.id = uuid();
    db('version').push(user);

    return db('version').find({id: user.id});
};

Version.all = function all() {
    return db('version');
};

Version.get = function get(userId) {
    return db('version').find({id: userId});
};

Version.remove = function remove(userId) {
    return db('version').remove({id: userId});
};

module.exports = Version;
