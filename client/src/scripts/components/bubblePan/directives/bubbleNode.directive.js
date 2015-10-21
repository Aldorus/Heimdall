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
            this.bubbleTouched = function bubbleTouched(ev) {
                console.log('touched');
                var element = ev.target;
                debugger;
                element.addEventListener('dragstart', function(e) {
                    console.log('test');
                }, false);
            };
        },
        templateUrl: 'components/bubblePan/partials/bubble-node.html'
    };
};
