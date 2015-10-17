'use strict';

angular.module('home', [])
    .controller('HomeController', require('./controllers/home.controller'))
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home/partials/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
            data: {pageTitle: 'Home'}
        });
    })
;

