describe('Auth a user - ', function() {
    beforeEach(function() {
        browser.get('/index.html');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Peashooter');
    });

    it('redirect ok', function () {

        element(by.model('authCtrl.user.email')).sendKeys('admin@peashooter.com');
        element(by.model('authCtrl.user.password')).sendKeys('admin');
        element(by.css('.form-button button')).click();
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return (/home/).test(url);
            });
        });
    });

});
