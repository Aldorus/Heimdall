module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-safari-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],
        frameworks: ['jasmine']
    });
};
