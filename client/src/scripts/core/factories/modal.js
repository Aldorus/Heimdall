'use strict';
/*@ngInject*/
module.exports = function (vModal) {
    var service = {};
    service.model = {};

    /**
     * Init the view for the modal
     * @param params
     * @returns {*}
     */
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
