'use strict';

angular.module('home', [])
    .controller('HomeController', require('./controllers/home.controller.js'))
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/home/partials/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
            data: {pageTitle: 'Home'}
        });
    })
;

