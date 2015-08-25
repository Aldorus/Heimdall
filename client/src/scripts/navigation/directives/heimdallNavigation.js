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
