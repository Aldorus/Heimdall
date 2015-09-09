'use strict';
/*@ngInject*/
module.exports = function (vModal) {
    var service = {};
    service.model = {};

    service.view = function(params) {

        if(params) {
            service.instance = vModal(params);
        }
        if(!service.instance){
            console.log('This modal was not instanciated yet');
        }
        return service.instance;
    };

    return service;
};
