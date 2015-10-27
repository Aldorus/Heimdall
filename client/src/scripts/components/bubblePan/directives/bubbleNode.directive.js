'use strict';
/*@ngInject*/
module.exports = function () {
    return {
        replace: true,
        controllerAs: 'bubbleNodeCtrl',
        scope: {
            node: '='
        },
        controller: function () {
        },
        templateUrl: 'components/bubblePan/partials/bubble-node.html'
    };
};
