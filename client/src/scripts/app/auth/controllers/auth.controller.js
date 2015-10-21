'use strict';

/*@ngInject*/
module.exports = function($scope, $state, account) {
    var self = this;

    $scope.user = {
        //email: 'admin@peashooter.com',
        //password: 'admin'
    };


    self.submit = function submit() {
        // Check if the form is valid
        if($scope.authForm.$invalid) {
            return;
        }
        self.logInProgress = true;
        account.authUser($scope.user.email, $scope.user.password)
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
