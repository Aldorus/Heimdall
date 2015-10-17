var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../GulpConfig'),
    connect = require('browser-sync'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util');

/**
 * Create a single file app.js with all js dependencies (we use bowserify who read the require word in file for making the link between files)
 */
module.exports = function () {


    // Use browserify
    var bundler = browserify({
        entries: [config.project + 'src/scripts/core/core.js'],
        debug: gutil.env.type === 'production' ? false : true
    });

    return bundler
        .bundle()
        .on('error', function (err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(ngAnnotate())
        // Add transformation tasks to the pipeline here.
        .pipe(gutil.env.type === 'production' ? uglify({
            mangle: false
        }) : gutil.noop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist + 'js/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream: true}) : gutil.noop());

};
