var gulp        = require('gulp'),
    htmlify = require('gulp-angular-htmlify'),
    templateCache = require('gulp-angular-templatecache'),
    connect = require('browser-sync'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    minifyHTML = require('gulp-minify-html'),
    config = require('../GulpConfig');

/**
 * concat all your file html (partials in the angular application)
 */
module.exports = function() {
    return gulp.src(config.project + 'src/scripts/**/*.html')
        .pipe(gutil.env.type === 'production' ? minifyHTML() : gutil.noop())
        .pipe(htmlify())
        .pipe(templateCache('templates.js',{
            module: config.appName
        }))
        .pipe(gutil.env.type === 'production' ? uglify({
            mangle: false
        }) : gutil.noop())
        .pipe(gulp.dest(config.dist + 'js'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
