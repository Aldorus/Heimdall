'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db.json');
var uuid = require('uuid');

var Log = {};

Log.save = function save(log) {
    if (log.id) {
        return db('log').chain().find({id: log.id}).assign(log).value();
    }

    log.id = uuid();
    db('log').push(log);

    return db('log').find({id: log.id});
};

Log.all = function all() {
    return db('log');
};

Log.get = function get(logId) {
    return db('log').find({id: logId});
};

Log.remove = function remove(logId) {
    return db('log').remove({id: logId});
};

module.exports = Log;
