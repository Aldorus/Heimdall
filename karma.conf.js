module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-safari-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-notify-reporter'
        ],
        singleRun: false,
        reporters: ['progress', 'notify'],
        notifyReporter: {
            reportEachFailure: true,
            reportSuccess: true
        },
        frameworks: ['jasmine'],
        exclude: [
            'i18n/fr_FR.json'
        ]
    });
};
