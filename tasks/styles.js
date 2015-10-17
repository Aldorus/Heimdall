var gulp = require('gulp'),
    sass = require("gulp-sass"),
    concat = require('gulp-concat'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    config = require('../GulpConfig'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    clip = require('gulp-clip-empty-files');

/**
 * Concat our CSS and build the sass file
 */
module.exports = function () {

    var files = [
        config.project + 'src/styles/*.*css',
        config.project + 'src/scripts/**/*.*css'

    ];

    return gulp.src(files)
        .pipe(clip())
        .pipe(sass({
            errLogToConsole: false,
            onError: function (err) {
                notify().write(err);
            },
            includePaths: gutil.env.template ? [gutil.env.template+"/styles/"] : null
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gutil.env.type === 'production' ? minifyCss() : gutil.noop())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.dist + 'styles/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());

};
