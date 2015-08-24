'use strict';
/*@ngInject*/
module.exports = function (account) {
    return {
        replace: true,
        controllerAs: 'NavigationController',
        controller: function($scope, $state){
            var user = account.getUser();
            $scope.account = user;

            $scope.isActive = function isActive() {
                return !$state.is('auth');
            };

            $scope.getAvatar = function getAvatar() {
                return 'https://secure.gravatar.com/avatar/' + CryptoJS.MD5(user.email) + '?d=mm';
            };

        },
        templateUrl: 'navigation/partials/heimdall-navigation.html'
    };
};
