(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../auth/auth');
require('../home/home');
require('../project/project');
require('../version/version');
require('../user/user');
require('../navigation/navigation');

angular.module('heimdall', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'vButton',
    'home', 'version', 'auth', 'project', 'navigation', 'user'])
    .constant('WS_ROOT_URL', 'http://localhost:3000/api/')
    .directive('stateClassName', require('./directives/stateClassName'))
    .directive('loader', require('./directives/loader'))
    .service('loading', require('./services/loading'))

    .config(["$urlRouterProvider", "$translateProvider", function ($urlRouterProvider, $translateProvider) {
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
    }])
;


},{"../auth/auth":2,"../home/home":10,"../navigation/navigation":12,"../project/project":14,"../user/user":17,"../version/version":20,"./directives/loader":6,"./directives/stateClassName":7,"./services/loading":8}],2:[function(require,module,exports){
'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/AuthController'))
    .service('account', require('./services/account'))
    .service('session', require('./services/session'))
    .run(["session", function(session) {
        session.init();
    }])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'auth/partials/auth.html',
            controller: 'AuthController'
        });
    }])
;


},{"./controllers/AuthController":3,"./services/account":4,"./services/session":5}],3:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($scope, $state, account) {

    $scope.user = {
        email: 'roussel.guillaume.gr@gmail.com',
        password: '370095'
    };

    $scope.submit = function submit() {
        // Check if the form is valid
        if($scope.authForm.$invalid) {
            return;
        }
        $scope.logInProgress = true;
        account.authUser($scope.user.email, $scope.user.password)
            .then(function() {
                $state.go('home');
                $scope.logInProgress = false;
            }, function() {
                // Error case
                $scope.logInProgress = false;
            });

    };
};
module.exports.$inject = ["$scope", "$state", "account"];

},{}],4:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var urlAuh = WS_ROOT_URL + 'auth/';
    var user;

    // Get the user if exist in localstorage
    if(localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Get the current user logged on the platform
     * @returns {{name: string, firstname: string, email: string}}
     */
    service.getUser = function getUser() {
        return user;
    };

    /**
     * Check if the user email and password are correct combination
     * @param email
     * @param password
     */
    service.authUser = function authUser(email, password) {
        var deferred = $q.defer();

        // Mock
        service.saveLocalStorage({
            id: 1,
            name: 'Roussel',
            firstname: 'Guillaume',
            email: email,
            password: password
        });

        deferred.resolve(service.getUser());

        // No Mock
        $http({
            url: urlAuh,
            data: {
                email: email,
                password: password
            }
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    /**
     * Save the user in params into the localStorage
     * @param userToSave
     */
    service.saveLocalStorage = function saveLocalStorage(userToSave) {
        user = userToSave;
        localStorage.setItem('user', JSON.stringify(userToSave));
    };

    /**
     * Destroy the user in the service AND in the localStorage
     */
    service.logout = function logout() {
        localStorage.removeItem('user');
        user = undefined;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL"];

},{}],5:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($rootScope, $state, account) {
    var service = {};

    service.init = function init() {
        service.checkAndRedirect($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            service.checkAndRedirect(toState.name);
        });
    };

    service.checkAndRedirect = function checkAndRedirect(stateName) {
        // Check if a user exist in the session
        if(!account.getUser() && stateName !== 'auth') {
            // If not we send the user on the auth page
            $state.go('auth');
        }
    };

    return service;
};
module.exports.$inject = ["$rootScope", "$state", "account"];
},{}],6:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($state, loading) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope) {

            function testIfSecure(stateName) {
                if (stateName !== 'auth' && stateName) {
                    scope.display = true;
                    loading.init()
                        .then(function() {
                            scope.display = false;
                        });
                } else {
                    scope.display = false;
                }
            }
            testIfSecure($state.current.name);

            /**
             * Listen when we change to another state
             * So add a className based on the current path
             */
            scope.$on('$stateChangeStart', function (e, toState) {
                testIfSecure(toState.name);
            });
        },
        templateUrl: 'core/partials/loader.html'
    };
};
module.exports.$inject = ["$state", "loading"];

},{}],7:[function(require,module,exports){
/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

/*@ngInject*/
module.exports = function ($state) {
    /**
     * Construct a className based on a state and a custom prefix
     * The default one is page-, customize it by adding a value to the directive
     * @param  {String} path   State name
     * @param  {String} prefix Custom prefix
     * @return {String}        ClassName
     */
    function className(path, prefix) {
        path = path || 'root';
        prefix = prefix || 'page-';
        return prefix + path.replace(/\./g, '-').toLowerCase();
    }

    return {
        restrict: 'A',
        link: function (scope, el, attr) {

            el
                .addClass(className($state.current.name, attr.stateClassName));

            /**
             * Listen when we change to another state
             * So add a className based on the current path
             */
            scope.$on('$stateChangeStart', function (e, toState, current, previousState) {

                el
                    .removeClass('page-root')
                    .removeClass(className(previousState.name, attr.stateClassName))
                    .addClass(className(toState.name, attr.stateClassName));

            });
        }
    };
};
module.exports.$inject = ["$state"];

},{}],8:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($q, account, projects, versions) {
    var service = {};

    /**
     * Init all the service
     */
    service.init = function init() {

        var deferred = $q.defer();
        var versionCpt = 0;

        projects.getProjects(account.getUser())
            .then(function (projects) {
                if(projects.length === 0) {
                    console.log('Projects are Loaded (empty)');
                    deferred.resolve();

                }
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    versions.getVersions(project)
                        .then(function() {
                            versionCpt++;
                            if(versionCpt >= projects.length) {
                                console.log('Project & Version are loaded');
                                deferred.resolve();
                            }
                        });
                }
            });


        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$q", "account", "projects", "versions"];


},{}],9:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function() {

};

},{}],10:[function(require,module,exports){
'use strict';

angular.module('home', [])
    .controller('HomeController', require('./controllers/HomeController'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'home/partials/home.html',
            controller: 'HomeController'
        });
    }])
;


},{"./controllers/HomeController":9}],11:[function(require,module,exports){
'use strict';
/*@ngInject*/
module.exports = function (account) {
    return {
        replace: true,
        controllerAs: 'NavigationController',
        controller: function($scope, $state){


            /**
             * Test if the menu navigation must be displayed on this state
             * @returns {boolean}
             */
            $scope.navigationActive = function navigationActive() {
                return !$state.is('auth');
            };

            /**
             * Logout the user, destroy the session and redirect to the auth page
             */
            $scope.logout = function logout() {
                account.logout();
                $state.go('auth');
            };

            /**
             * Check if the item in the menu is linked to a state
             * @param item
             * @returns {boolean}
             */
            $scope.itemIsSelected = function itemIsSelected(item) {
                return $state.current.name.indexOf(item) >= 0;
            };

            /**
             * When the menu appear
             */
            $scope.appear = function appear() {
                var user = account.getUser();
                $scope.account = user;
            };

            /**
             * Get the avatar from gravatar
             * @returns {string}
             */
            $scope.getAvatar = function getAvatar() {
                if($scope.account) {
                    return 'https://secure.gravatar.com/avatar/' + CryptoJS.MD5($scope.account.email) + '?d=mm';
                }
            };

        },
        templateUrl: 'navigation/partials/heimdall-navigation.html'
    };
};
module.exports.$inject = ["account"];

},{}],12:[function(require,module,exports){
'use strict';

angular.module('navigation', [])
    .directive('heimdallNavigation', require('./directives/heimdallNavigation'))

;


},{"./directives/heimdallNavigation":11}],13:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($scope, projects, account) {

    $scope.newProject = {};

    projects.getProjects(account.getUser()).then(function(projects){
        $scope.projects = projects;
    });

    /**
     * Open the panel for create project
     */
    $scope.newProject = function newProject() {
        $scope.open = true;
    };

    /**
     * Close the panel for create project
     */
    $scope.closeProject = function closeProject() {
        $scope.open = false;
    };

    /**
     * Create project
     */
    $scope.createProject = function createProject() {

        if($scope.newProjectForm.$invalid) {
            return;
        }

        $scope.createLoading = true;
        projects.createProject(account.getUser(), $scope.newProject)
            .then(function() {
                $scope.createLoading = false;
            }, function() {
                $scope.createLoading = false;
            });
    };
};
module.exports.$inject = ["$scope", "projects", "account"];

},{}],14:[function(require,module,exports){
'use strict';

angular.module('project', [])
    .controller('ProjectController', require('./controllers/ProjectController'))
    .service('projects', require('./services/projects'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project',
            templateUrl: 'project/partials/project.html',
            controller: 'ProjectController'
        });
    }])
;


},{"./controllers/ProjectController":13,"./services/projects":15}],15:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'projects/';
    var projects;

    service.getProjects = function getProjects(user) {
        var deferred = $q.defer();

        if(projects) {
            deferred.resolve(projects);
        }

        $http({
            method: 'GET',
            url: url,
            data: {
                /*jshint camelcase:false*/
                user_id: user.id
            }
        }).then(function(response) {
            projects = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    service.createProject = function createProject(user, project) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: url,
            data: {
                /*jshint camelcase:false*/
                admin_id: user.id,
                title: project.title
            }
        }).then(function(response) {
            deferred.resolve(response.data);
            projects.push(response.data);
        }, function() {
        });

        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL"];
},{}],16:[function(require,module,exports){
module.exports=require(9)
},{"C:\\cygwin64\\home\\Exod\\Heimdall\\client\\src\\scripts\\home\\controllers\\HomeController.js":9}],17:[function(require,module,exports){
'use strict';

angular.module('user', [])
    .controller('UserController', require('./controllers/UserController'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('user', {
            url: '/user',
            templateUrl: 'user/partials/user.html',
            controller: 'UserController'
        });
    }])
;


},{"./controllers/UserController":16}],18:[function(require,module,exports){
module.exports=require(9)
},{"C:\\cygwin64\\home\\Exod\\Heimdall\\client\\src\\scripts\\home\\controllers\\HomeController.js":9}],19:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'builds/';
    var versions = [];

    /**
     * Get all versions for the project in params
     * @param project
     */
    service.getVersions = function(project) {
        var deferred = $q.defer();

        if(versions[project.id]) {
            deferred.resolve(versions[project.id]);
        }

        $http({
            method: 'GET',
            url: url,
            data: {
                /*jshint camelcase:false*/
                project_id: project.id
            }
        }).then(function(response) {
            versions[project.id] = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL"];

},{}],20:[function(require,module,exports){
'use strict';

angular.module('version', [])
    .controller('VersionController', require('./controllers/VersionController'))
    .service('versions', require('./services/versions'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('version', {
            url: '/version',
            templateUrl: 'version/partials/version.html',
            controller: 'VersionController'
        });
    }])
;


},{"./controllers/VersionController":18,"./services/versions":19}]},{},[1])


//# sourceMappingURL=app.js.map