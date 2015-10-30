'use strict';
/*@ngInject*/
module.exports = function () {
    return {
        replace: true,
        controllerAs: 'bubbleNodeCtrl',
        scope: {
            node: '='
        },
        link: function(scope, element) {
            var canvas = element[0];
            canvas.height = canvas.style.height;
            canvas.width = 150;

            // Build the canvas
            var context = canvas.getContext('2d');
            context.lineWidth   = 1;
            context.fillStyle   = '#00AC6B';

            context.arc(75, 75, 75, 0, Math.PI * 2);
            context.fill();
        },
        controller: function () {

        },
        templateUrl: 'components/bubblePan/partials/bubble-node.html'
    };
};
