var gulp = require('gulp'),
    config = require('../GulpConfig'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),// linting
    stylish = require('jshint-stylish');// linting

/**
 * Create a single file app.js with all js dependencies (we use bowerify who read the require word in file for making the link between files)
 */
module.exports = function () {
    return gulp.src([config.project +  'src/scripts/**/*.js', config.test + '**/*.js'])
        .pipe(jshint())
        .pipe(notify(function (file) {
            if (file.jshint.success) {
                // Don't show something if success
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join("\n");
            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }))
        .pipe(jshint.reporter(stylish));
};
