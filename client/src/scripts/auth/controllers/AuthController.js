'use strict';

/*@ngInject*/
module.exports = function($scope, account) {

    $scope.user = {};

    $scope.submit = function submit() {
        console.log('submit form', $scope.authForm);

        // Check if the form is valid
        if($scope.authForm.$invalid) {
            return;
        }
        account.authUser($scope.user.email, $scope.user.password)
            .then(function(data) {

            }, function() {

            });

    };
};
