exports.config = {
//    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
    specs: ['client/tests/e2e/**/*.js'],
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8080',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};