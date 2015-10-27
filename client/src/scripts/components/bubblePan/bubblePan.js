'use strict';

angular.module('bubblePan', ['ngDragDrop'])
    .directive('bubblePan', require('./directives/bubblePan.directive.js'))
    .directive('bubbleNode', require('./directives/bubbleNode.directive.js'))

;


