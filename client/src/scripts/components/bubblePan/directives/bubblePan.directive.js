'use strict';
/*@ngInject*/
module.exports = function () {
    return {
        replace: true,
        controllerAs: 'bubblePanCtrl',
        scope: {
            nodes: '='
        },
        controller: function () {
            var self = this;

            self.getSizeX = function getSizeX() {
                return 150;
            };

            self.getSizeY = function getSizeY() {
                return 150;
            };
        },
        templateUrl: 'components/bubblePan/partials/bubble-pan.html'
    };
};
