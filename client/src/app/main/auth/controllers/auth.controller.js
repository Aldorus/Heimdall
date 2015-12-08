'use strict';
export class AuthController {
    constructor($scope, $state, account) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        this.account = account;
    }

    submit() {
        // Check if the form is valid
        if (this.$scope.authForm.$invalid) {
            return;
        }
        self.logInProgress = true;
        this.account.authUser(this.$scope.user.email, this.$scope.user.password)
            .then(function () {
                this.$state.go('home');
                self.logInProgress = false;
            }, function () {
                // Error case
                self.logInProgress = false;
            });

    }
}
