var gulp = require('gulp'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    config = require('../GulpConfig');

/**
 * Move assets to build folder
 * Everything except the favicon are moved in the asset folder
 * The favicon is copied in build root
 */
module.exports = function() {
    return gulp.src([config.project + 'src/assets/**/*'])
        .pipe(gulp.dest(config.dist + 'assets/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
