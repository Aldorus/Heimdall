'use strict';

/*@ngInject*/
module.exports = function ($scope, users, account, modal) {
    $scope.newUser = {};

    users.getUsers().then(function (users) {
        $scope.users = users;
    });

    $scope.isCurrentUser = function isCurrentUser(user) {
        if (account.getUser().id === user.id) {
            return true;
        }
        return false;
    };

    $scope.createUser = function createUser() {
        if ($scope.newUserForm.$invalid) {
            return;
        }
        $scope.createLoading = true;
        users.createUser($scope.newUser)
            .then(function () {
                $scope.createLoading = false;
                $scope.open = false;
            }, function () {
                $scope.createLoading = false;
            });
    };

    $scope.editUser = function editUser(user) {
        $scope.open = true;
        $scope.newUser = angular.copy(user);
    };

    $scope.openNewUser = function openNewUser() {
        $scope.open = true;
        // Reset validation
        $scope.newUserForm.$setPristine();
        $scope.newUser = {};
    };

    $scope.validEditUser = function validEditUser() {
        if ($scope.newUserForm.$invalid) {
            return;
        }

        $scope.createLoading = true;
        users.updateUser($scope.newUser).then(function (user) {
            $scope.createLoading = false;
            $scope.open = false;

            // Update the scope
            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].id === $scope.newUser.id) {
                    $scope.users[i] = user;
                }
            }
        }, function () {
            $scope.createLoading = false;
        });
    };

    $scope.cancelEditUser = function cancelEditUser() {
        $scope.open = false;
    };

    $scope.removeUser = function removeUser(user) {
        modal.user = user;
        modal.view({
            controller: 'RemoveUserController',
            templateUrl: '../partials/remove-user.html'
        }).activate();
    };
};
