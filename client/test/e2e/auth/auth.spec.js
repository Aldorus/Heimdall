describe('Auth a user - ', function() {
    it('Should be on homepage', function () {
        browser.get('/index.html');
        expect(browser.getTitle()).toEqual('Peashooter');

        element(by.model('user.email')).sendKeys('admin@peashooter.com');
        element(by.model('user.password')).sendKeys('admin');
        element(by.css('.form-button button')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return (/home/).test(url);
            });
        });

        var homeBox = element.all(by.css('.box-count'));
        expect(homeBox.count()).toEqual(3);
    });
});
