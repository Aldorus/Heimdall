'use strict';

/*@ngInject*/
module.exports = function($state, account) {
    var self = this;

    self.user = {
        email: 'admin@peashooter.com',
        password: 'admin'
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
