describe("MainCtrTest", function () {
    // Load the module
    beforeEach(module('heimdall'));
    var scope, controller;

    // Load the controller
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('MainCtrl', {
            '$scope': scope
        });
    }));

    it("test if jasmin/main controller is ok", function () {
        expect(true).toBe(true);
    });
});
