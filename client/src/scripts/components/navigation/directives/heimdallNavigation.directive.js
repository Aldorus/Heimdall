'use strict';
/*@ngInject*/
module.exports = function (account) {
    return {
        replace: false,
        restrict: 'E',
        controllerAs: 'navigationCtrl',
        controller: function($state){

            /**
             * Test if the menu navigation must be displayed on this state
             * @returns {boolean}
             */
            this.navigationActive = function navigationActive() {
                return !$state.is('auth');
            };

            /**
             * Logout the user, destroy the session and redirect to the auth page
             */
            this.logout = function logout() {
                account.logout();
                $state.go('auth');
            };

            /**
             * Check if the item in the menu is linked to a state
             * @param item
             * @returns {boolean}
             */
            this.itemIsSelected = function itemIsSelected(item) {
                return $state.current.name.indexOf(item) >= 0;
            };

            /**
             * When the menu appear
             */
            this.appear = function appear() {
                var user = account.getUser();
                this.account = user;
            };

            /**
             * Get the avatar from gravatar service
             * @returns {string}
             */
            this.getAvatar = function getAvatar() {
                if(this.account) {
                    return 'https://secure.gravatar.com/avatar/' + CryptoJS.MD5(this.account.email) + '?d=mm';
                }
            };

        },
        templateUrl: 'components/navigation/partials/heimdall-navigation.html'
    };
};
