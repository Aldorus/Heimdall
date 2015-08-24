/**
 * stateClassName directive
 * Bind a custom class based on the current state
 */
'use strict';

/*@ngInject*/
module.exports = function () {
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
        return prefix + path.replace(/\./g,'-').toLowerCase();
    }

    return {
        restrict: 'A',
        link: function(scope, el, attr) {
            /**
             * Listen when we change to another state
             * So add a className based on the current path
             */
            scope.$on('$stateChangeStart', function(e, toState, current, previousState) {

                el
                  .removeClass(className(previousState.name, attr.stateClassName))
                  .addClass(className(toState.name, attr.stateClassName))
                  .removeClass('no-network')
                  .addClass( !window.navigator.onLine ? 'no-network' : '');

            });
        }
    };
};
