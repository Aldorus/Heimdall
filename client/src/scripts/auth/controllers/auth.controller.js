'use strict';

/*@ngInject*/
module.exports = function($state, account) {
    this.user = {
        email: 'admin@peashooter.com',
        password: 'admin'
    };


    this.submit = function submit() {
        // Check if the form is valid
        if(this.authForm.$invalid) {
            return;
        }
        this.logInProgress = true;
        account.authUser(this.user.email, this.user.password)
            .then(function() {
                $state.go('home');
                this.logInProgress = false;
            }, function() {
                // Error case
                this.logInProgress = false;
            });

    };

    return this;
};
