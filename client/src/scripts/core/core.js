'use strict';

require('../app/auth/auth');
require('../app/home/home');
require('../app/project/project');
require('../app/version/version');
require('../app/build/build');
require('../app/user/user');
require('../components/navigation/navigation');
require('../components/bubblePan/bubblePan');

angular.module('heimdall', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'vButton', 'vModal',
    'home', 'version', 'build', 'auth', 'project', 'user',
    'bubblePan', 'navigation'])
    .constant('WS_ROOT_URL', 'http://localhost:3000/api/')
    .directive('stateClassName', require('./directives/stateClassName'))
    .directive('loader', require('./directives/loader'))
    .service('loading', require('./services/loading.service.js'))
    .factory('modal', require('./factories/modal'))
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    })

    .config(function ($urlRouterProvider, $translateProvider, $animateProvider) {

        // Remove animation on all ng-if and ng-repeat
        $animateProvider.classNameFilter(/bi-animate/);

        $urlRouterProvider.otherwise('/auth');

        /**
         * The provider the the traducer module
         */
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.preferredLanguage('fr_FR');
    })
;

