var gulp = require('gulp'),
    convert = require('gulp-convert'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    config = require('../GulpConfig');

/**
 * Build a languages.json from our Yaml files from
 * the directory i18n
 *
 * Each file must respect this convention
 * i18n/lang-LANG.yml
 *
 * Than just a file with key value
 */
module.exports = function () {

    // Build file for angular Translate
    return gulp.src(config.project + 'src/i18n/*.yml')
        .pipe(convert({
            from: 'yml',
            to: 'json'
        }))
        .pipe(gulp.dest(config.dist + 'i18n/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());

};
