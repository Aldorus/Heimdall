(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    'vButton', 'vModal',
    'home', 'version', 'build', 'auth', 'project', 'navigation', 'user'])
    .constant('WS_ROOT_URL', 'http://localhost:3000/api/')
    .directive('stateClassName', require('./directives/stateClassName'))
    .directive('loader', require('./directives/loader'))
    .service('loading', require('./services/loading.service'))
    .factory('modal', require('./factories/modal'))
    .run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.$state = $state;
    }])
    .config(["$urlRouterProvider", "$translateProvider", "$animateProvider", function ($urlRouterProvider, $translateProvider, $animateProvider) {

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
    }])
;


},{"../auth/auth":2,"../build/build":6,"../home/home":14,"../navigation/navigation":16,"../project/project":18,"../user/user":23,"../version/version":26,"./directives/loader":9,"./directives/stateClassName":10,"./factories/modal":11,"./services/loading.service":12}],2:[function(require,module,exports){
'use strict';

angular.module('auth', [])
    .controller('AuthController', require('./controllers/auth.controller'))
    .service('account', require('./services/account.service'))
    .service('session', require('./services/session.service'))
    .run(["session", function(session) {
        session.init();
    }])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'auth/partials/auth.html',
            controller: 'AuthController',
            controllerAs: 'authCtrl'
        });
    }])
;


},{"./controllers/auth.controller":3,"./services/account.service":4,"./services/session.service":5}],3:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($state, account) {
    var self = this;

    self.user = {
        //email: 'admin@peashooter.com',
        //password: 'admin'
    };


    self.submit = function submit() {
        // Check if the form is valid
        if(self.authForm.$invalid) {
            return;
        }
        self.logInProgress = true;
        account.authUser(self.user.email, self.user.password)
            .then(function() {
                $state.go('home');
                self.logInProgress = false;
            }, function() {
                // Error case
                self.logInProgress = false;
            });

    };

    return self;
};
module.exports.$inject = ["$state", "account"];

},{}],4:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var urlAuh = WS_ROOT_URL + 'users/auth/';
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

        $http({
            method: 'POST',
            url: urlAuh,
            data: {
                email: email,
                password: password
            }
        }).then(function(response) {
            service.saveLocalStorage(response.data);
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

    /**
     * Init the session service
     * This service listen all the change state, and check if the user has a current session
     * If the user has not session, he will be redirected to the auth state
     */
    service.init = function init() {
        service.checkAndRedirect($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            service.checkAndRedirect(toState.name);
        });
    };

    /**
     * Check the session and redirect the user to the auth
     * @param stateName
     */
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

angular.module('build', [])
    .controller('BuildController', require('./controllers/build.controller'))
    .service('builds', require('./services/builds'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('build', {
            url: '/build/:buildId',
            templateUrl: 'build/partials/build.html',
            controller: 'BuildController',
            controllerAs: 'buildCtrl',
            resolve: {
                build: ["$stateParams", "builds", function ($stateParams, builds) {
                    return builds.getBuildById($stateParams.buildId);
                }]
            }
        });
    }])
;


},{"./controllers/build.controller":7,"./services/builds":8}],7:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function(build) {
    this.build = build;

    /**
     * Open the panel for create project
     */
    this.newBuild = function newBuild() {
        this.open = true;
    };

    /**
     * Close the panel for create project
     */
    this.closeBuild = function closeBuild() {
        this.open = false;
    };

    return this;
};
module.exports.$inject = ["build"];

},{}],8:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'builds/';
    var builds = [];

    /**
     * Get all builds for the project in params
     * @param project
     */
    service.getBuildsByProject = function getBuildsByProject(project) {
        var deferred = $q.defer();

        if (builds[project.id]) {
            deferred.resolve(builds[project.id]);
            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: url,
            params: {
                projectId: project.id
            }
        }).then(function (response) {
            builds[project.id] = response.data;
            deferred.resolve(response.data);
        }, function () {

        });

        return deferred.promise;
    };

    service.getBuildById = function getBuildById(buildId) {
        var deferred = $q.defer();

        // Search in cache
        var cachedBuild = service.getBuildByIdInCache(buildId);

        if (cachedBuild) {
            console.log(cachedBuild);
            deferred.resolve(cachedBuild);
            return deferred.promise;
        }

        // Otherwise we call the API
        $http({
            method: 'GET',
            url: url + buildId
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function () {

        });

        return deferred.promise;
    };

    service.getBuildByIdInCache = function getBuildByIdInCache(buildId) {
        var builds = service.getAllBuilds();
        for(var i = 0; i<builds.length; i++) {
            if(builds[i].id === buildId) {
                return builds[i];
            }
        }
    };

    /**
     * Only in cache memory
     */
    service.getAllBuilds = function getAllBuilds() {
        var agreBuilds = [];
        for (var i = 0; i < builds.length; i++) {
            agreBuilds.push(builds[i]);
        }
        return agreBuilds;
    };

    service.createBuild = function createBuild(build, project) {
        var deferred = $q.defer();

        build.projectId = project.id;

        $http({
            method: 'POST',
            url: url,
            data: build
        }).then(function (response) {
            deferred.resolve(response.data);
            builds.push(response.data);
        }, function () {
        });

        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL"];

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
        scope:true,
        link: function (scope, el, attr) {

            el.addClass(className($state.current.name, attr.stateClassName));

            /**
             * Listen when we change to another state
             * So add a className based on the current path
             */
            scope.$on('$stateChangeStart', function (e, toState, current, previousState) {

                el.removeClass('page-root');
                if(previousState) {
                    el.removeClass(className(previousState.name, attr.stateClassName));
                }
                el.addClass(className(toState.name, attr.stateClassName));

            });
        }
    };
};
module.exports.$inject = ["$state"];

},{}],11:[function(require,module,exports){
'use strict';
/*@ngInject*/
module.exports = function (vModal) {
    var service = {};
    service.model = {};

    /**
     * Init the view for the modal
     * @param params
     * @returns {*}
     */
    service.view = function(params) {

        if(params) {
            service.instance = vModal(params);
        }
        if(!service.instance){
            console.log('This modal was not instanciated yet');
        }
        return service.instance;
    };

    return service;
};
module.exports.$inject = ["vModal"];

},{}],12:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($q, account, projects, versions, builds, users) {
    var service = {};

    /**
     * Load all the data
     * @returns {Promise}
     */
    service.init = function init() {

        var deferred = $q.defer();

        var projectsLoaded = false;
        var usersLoaded = false;

        service.loadProject().then(function () {
            projectsLoaded = true;
            if(usersLoaded) {
                deferred.resolve();
            }
        });

        service.loadUsers().then(function() {
            usersLoaded = true;
            if(projectsLoaded) {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    service.loadProject = function loadProject() {
        var deferred = $q.defer();
        var versionsOk = false;
        var buildsOk = false;

        projects.getProjects(account.getUser())
            .then(function (projects) {
                if (projects.length === 0) {
                    console.log('Projects are Loaded (empty)');
                    deferred.resolve();
                }

                service.loadVersions(projects).then(function() {
                    versionsOk = true;
                    if(buildsOk) {
                        deferred.resolve();
                    }
                });

                service.loadBuilds(projects).then(function() {
                    buildsOk = true;
                    if(versionsOk) {
                        deferred.resolve();
                    }
                });
            });
        return deferred.promise;
    };

    /* jshint ignore:start */
    service.loadBuilds = function loadBuilds(projects) {
        var deferred = $q.defer();

        var projectCpt = 0;
        for (var i = 0; i < projects.length; i++) {

            builds.getBuildsByProject(projects[i])
                .then(function () {
                    projectCpt++;
                    if (projectCpt >= projects.length) {
                        console.log('Builds are loaded');
                        deferred.resolve();
                    }
                });
        }

        return deferred.promise;
    };
    /* jshint ignore:end */

    /* jshint ignore:start */
    service.loadVersions = function loadVersions(projects) {
        var deferred = $q.defer();

        var projectCpt = 0;
        for (var i = 0; i < projects.length; i++) {
            versions.getVersionsByProjects(projects[i])
                .then(function () {
                    projectCpt++;
                    if (projectCpt >= projects.length) {
                        console.log('Versions are loaded');
                        deferred.resolve();
                    }
                });

        }
        return deferred.promise;
    };
    /* jshint ignore:end */

    service.loadUsers = function loadUsers() {
        var deferred = $q.defer();
        users.getUsers().then(function(){
            console.log('Users are loaded');
            deferred.resolve();
        });
        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$q", "account", "projects", "versions", "builds", "users"];


},{}],13:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function(projects, versions, builds) {
    var self = this;
    // Get count project
    projects.getProjects().then(function(projects) {
        console.log('here');
        self.countProject = projects.length;
        if(self.countProject) {
            self.countVersion = versions.getAllVersions().length / self.countProject * 100 / 100;
            self.countBuild = builds.getAllBuilds().length / self.countProject;
        } else {
            self.countVersion = 0;
            self.countBuild = 0;
        }
    });

    return self;
};
module.exports.$inject = ["projects", "versions", "builds"];

},{}],14:[function(require,module,exports){
'use strict';

angular.module('home', [])
    .controller('HomeController', require('./controllers/home.controller'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home/partials/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
            data: {pageTitle: 'Home'}
        });
    }])
;


},{"./controllers/home.controller":13}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';

angular.module('navigation', [])
    .directive('heimdallNavigation', require('./directives/heimdallNavigation.directive'))

;


},{"./directives/heimdallNavigation.directive":15}],17:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($state, projects, account, builds) {
    var self = this;

    self.newProject = {};

    projects.getProjects(account.getUser()).then(function(projects){
        self.projects = projects;
    });

    self.getBuildsByProject = function getBuildsByProject(project) {
        builds.getBuildsByProject(project).then(function(builds) {
            project.builds = builds;
        });
    };

    /**
     * Open the panel for create project
     */
    self.newProject = function newProject() {
        self.open = true;
    };

    /**
     * Close the panel for create project
     */
    self.closeProject = function closeProject() {
        self.open = false;
    };

    self.goBuild = function(build) {
        $state.go('build', {
            buildId: build.id
        });
    };

    /**
     * Create project
     */
    self.createProject = function createProject() {

        if(self.newProjectForm.$invalid) {
            return;
        }

        self.createLoading = true;
        projects.createProject(self.newProject, account.getUser())
            .then(function(project) {

                // Build the build object to save
                var build = {
                    name: 'Default',
                    config: ''
                };
                builds.createBuild(build, project).then(function() {
                    self.createLoading = false;
                    self.open = false;

                }, function() {
                    self.createLoading = false;
                });
            }, function() {
                self.createLoading = false;
            });
    };

    return self;
};
module.exports.$inject = ["$state", "projects", "account", "builds"];

},{}],18:[function(require,module,exports){
'use strict';

angular.module('project', [])
    .controller('ProjectController', require('./controllers/project.controller'))
    .service('projects', require('./services/projects'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project',
            templateUrl: 'project/partials/project.html',
            controller: 'ProjectController',
            controllerAs: 'projectCtrl'
        });
    }])
;


},{"./controllers/project.controller":17,"./services/projects":19}],19:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL, account) {
    var service = {};
    var url = WS_ROOT_URL + 'projects/';
    var projects;

    service.getProjects = function getProjects(user) {
        var deferred = $q.defer();

        if(!user) {
            user = account.getUser();
        }

        if(projects) {
            deferred.resolve(projects);
            return deferred.promise;
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

    service.createProject = function createProject(project, user) {
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

            projects.push(response.data);
            deferred.resolve(response.data);

        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL", "account"];

},{}],20:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($scope, modal, users) {

    /**
     * The user has close the modal without any action
     */
    $scope.close = function close() {
        modal.view().deactivate();
    };

    $scope.confirm = function confirm() {
        users.deleteUser(modal.user).then(function() {
            modal.view().deactivate();
        });
    };
};
module.exports.$inject = ["$scope", "modal", "users"];

},{}],21:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function ($scope, users, account, modal) {
    $scope.newUser = {};

    users.getUsers().then(function (users) {
        $scope.users = users;
    });

    $scope.isCurrentUser = function isCurrentUser(user) {
        if (account.getUser().id === user.id) {
            return true;
        }
        return false;
    };

    $scope.createUser = function createUser() {
        if ($scope.newUserForm.$invalid) {
            return;
        }
        $scope.createLoading = true;
        users.createUser($scope.newUser)
            .then(function () {
                $scope.createLoading = false;
                $scope.open = false;
            }, function () {
                $scope.createLoading = false;
            });
    };

    $scope.editUser = function editUser(user) {
        $scope.open = true;
        $scope.newUser = angular.copy(user);
    };

    $scope.openNewUser = function openNewUser() {
        $scope.open = true;
        // Reset validation
        $scope.newUserForm.$setPristine();
        $scope.newUser = {};
    };

    $scope.validEditUser = function validEditUser() {
        if ($scope.newUserForm.$invalid) {
            return;
        }

        $scope.createLoading = true;
        users.updateUser($scope.newUser).then(function (user) {
            $scope.createLoading = false;
            $scope.open = false;

            // Update the scope
            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].id === $scope.newUser.id) {
                    $scope.users[i] = user;
                }
            }
        }, function () {
            $scope.createLoading = false;
        });
    };

    $scope.cancelEditUser = function cancelEditUser() {
        $scope.open = false;
    };

    $scope.removeUser = function removeUser(user) {
        modal.user = user;
        modal.view({
            controller: 'RemoveUserController',
            templateUrl: 'user/partials/remove-user.html'
        }).activate();
    };
};
module.exports.$inject = ["$scope", "users", "account", "modal"];

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
'use strict';

angular.module('user', [])
    .controller('UserController', require('./controllers/UserController'))
    .controller('RemoveUserController', require('./controllers/RemoveUserController'))
    .service('users', require('./services/users'))
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('user', {
            url: '/user',
            templateUrl: 'user/partials/user.html',
            controller: 'UserController'
        });
    }])
;


},{"./controllers/RemoveUserController":20,"./controllers/UserController":21,"./services/users":22}],24:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function() {

};

},{}],25:[function(require,module,exports){
'use strict';

/*@ngInject*/
module.exports = function($http, $q, WS_ROOT_URL) {
    var service = {};
    var url = WS_ROOT_URL + 'versions/';
    var versions = [];

    /**
     * Get all versions for the project in params
     * @param project
     */
    service.getVersionsByProjects = function getVersionsByProjects(project) {
        var deferred = $q.defer();

        if(versions[project.id]) {
            deferred.resolve(versions[project.id]);
            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: url,
            params: {
                /*jshint camelcase:false*/
                projectId: project.id
            }
        }).then(function(response) {
            versions[project.id] = response.data;
            deferred.resolve(response.data);
        }, function() {

        });

        return deferred.promise;
    };

    /**
     * Only in cache memory
     */
    service.getAllVersions = function getAllVersions() {
        var agreVersions = [];

        for(var i = 0; i<versions.length; i++) {
            agreVersions.push(versions[i]);
        }
        return agreVersions;
    };

    return service;
};
module.exports.$inject = ["$http", "$q", "WS_ROOT_URL"];

},{}],26:[function(require,module,exports){
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


},{"./controllers/VersionController":24,"./services/versions":25}]},{},[1])


//# sourceMappingURL=app.js.map