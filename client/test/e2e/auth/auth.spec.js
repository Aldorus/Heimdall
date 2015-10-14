describe('angularjs homepage todo list', function() {
    it('should add a todo', function () {
        browser.get('/index.html');

        expect(browser.getTitle()).toEqual('Super Calculator');
    });
});