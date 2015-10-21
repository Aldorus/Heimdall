'use strict';

describe('Homepage ', function() {
    beforeEach(function() {
        browser.get('/#/home');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Peashooter - Home');
    });

    it('should have tree stats box', function () {

        expect(element.all(by.css('.count-box')).count()).toEqual(3);
    });

});
