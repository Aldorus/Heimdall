'use strict';

var low = require('lowdb');
var db = low('./server/db/heimdall-db.json');
var uuid = require('uuid');

var User = {};

User.save = function save(user) {
    if (user.id) {
        return db('users').chain().find({id: user.id}).assign(user).value();
    }

    user.id = uuid();
    db('users').push(user);

    return db('users').find({id: user.id});
};

User.all = function all() {
    return db('users');
};

User.get = function get(userId) {
    return db('users').find({id: userId});
};

User.getByEmail = function getByEmail(email) {
    return db('users').find({email: email});
};

User.remove = function remove(userId) {
    return db('users').remove({id: userId});
};

User.size = function() {
    return db('users').size();

};

module.exports = User;
