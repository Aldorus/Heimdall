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
