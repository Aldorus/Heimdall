'use strict';

require('../build/build');
require('../auth/auth');
require('../user/user');
require('../project/project');
require('../navigation/navigation');

angular.module('heimdall', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'build', 'auth', 'project', 'navigation', 'user'])
    .constant('WS_ROOT_URL', 'http://localhost:3000/')
    .directive('stateClassName', require('./directives/stateClassName'))
    .config(function ($urlRouterProvider, $translateProvider) {
        $urlRouterProvider.otherwise('/auth');

        /**
         * The provider the the traductor module
         */
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.preferredLanguage('en_US');
    })
;

