'use strict';

angular.module('home', [])
    .controller('HomeController', require('./controllers/HomeController'))
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home/partials/home.html',
            controller: 'HomeController'
        });
    })
;

