var gulp   = require('gulp'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    config = require('../GulpConfig');

/**
 * Simply move the index.html file into the build folder
 */
module.exports = function() {
    return gulp.src(config.project + 'src/**.*')
        .pipe(gulp.dest(config.dist))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
