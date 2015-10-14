var gulp = require('gulp'),
    protractor = require('gulp-protractor').protractor,
    gutil = require('gulp-util'),
    config = require('../GulpConfig');

/**
 * Move assets to build folder
 * Everything except the favicon are moved in the asset folder
 * The favicon is copied in build root
 */
module.exports = function() {
    return gulp.src([config.project + 'test/e2e/**/*.js'])
        .pipe(protractor({
            'configFile': __dirname + '/../protractor.conf.js',
            'args': ['--baseUrl', 'http://localhost:8080/build']
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', function () {
            // Close browser sync server
            browserSync.exit();
            done();
        });
};