'use strict';

require('../auth/auth');
require('../home/home');
require('../project/project');
require('../version/version');
require('../build/build');
require('../user/user');
require('../navigation/navigation');

angular.module('heimdall', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'vButton','vModal',
    'home', 'version', 'build', 'auth', 'project', 'navigation', 'user'])
    .constant('WS_ROOT_URL', 'http://localhost:3000/api/')
    .directive('stateClassName', require('./directives/stateClassName'))
    .directive('loader', require('./directives/loader'))
    .service('loading', require('./services/loading'))
    .factory('modal', require('./factories/modal'))

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

function loadingData() {
    var initInjector = angular.injector(['ng']);
    var loadingService = initInjector.get('loading');
    return loadingService.init();
}

function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['heimdall']);
    });
}

loadingData().then(bootstrapApplication);

