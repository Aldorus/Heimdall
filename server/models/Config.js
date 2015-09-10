'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db.json');
var uuid = require('uuid');

var config = {};

config.save = function save(config) {
    if (config.id) {
        return db('config').chain().find({id: config.id}).assign(config).value();
    }

    config.id = uuid();
    db('config').push(config);

    return db('config').find({id: config.id});
};

config.all = function all() {
    return db('config');
};

config.get = function get(configId) {
    return db('config').find({id: configId});
};

config.remove = function remove(configId) {
    return db('config').remove({id: configId});
};

module.exports = config;
