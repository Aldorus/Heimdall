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
