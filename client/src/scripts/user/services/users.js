'use strict';

module.exports = function($http, $q, WS_ROOT_URL) {
    var url = WS_ROOT_URL + 'users/';
    var service = {};
    var users;

    service.getUsers = function getUsers() {
        var deferred = $q.defer();

        if(users) {
            deferred.resolve(users);
            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: url
        }).then(function(response) {
            users = response.data;
            deferred.resolve(response.data);
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    };


    service.createUser = function createUser(user) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: url,
            data: user
        }).then(function(response) {
            deferred.resolve(response.data);
            users.push(response.data);
        }, function() {
        });

        return deferred.promise;
    };

    service.updateUser = function updateUser(user) {
        var deferred = $q.defer();

        $http({
            method: 'PUT',
            url: url + user.id,
            data: user
        }).then(function(response) {

            var position = users.indexOf(user);
            users[position] = response.data;
            deferred.resolve(response.data);

        }, function() {
        });

        return deferred.promise;
    };


    service.deleteUser = function deleteUser(user) {
        var deferred = $q.defer();

        $http({
            method: 'DELETE',
            url: url + user.id
        }).then(function(response) {

            var position = users.indexOf(user);
            users.splice(position, 1);
            deferred.resolve(response.data);

        }, function() {
        });

        return deferred.promise;
    };

    return service;
};
