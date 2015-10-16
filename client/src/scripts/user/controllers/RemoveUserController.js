'use strict';

/*@ngInject*/
module.exports = function($scope, modal, users) {

    /**
     * The user has close the modal without any action
     */
    $scope.close = function close() {
        modal.view().deactivate();
    };

    $scope.confirm = function confirm() {
        users.deleteUser(modal.user).then(function() {
            modal.view().deactivate();
        });
    };
};
