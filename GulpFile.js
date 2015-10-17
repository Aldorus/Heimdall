var gulp = require('gulp'),
    gutil   = require('gulp-util'),
    protractor = require('gulp-protractor'),
    browserSync = require('browser-sync'),
    config = require('./GulpConfig');

// Build your vendors
gulp.task('vendor', require('./tasks/vendor'));

// Concatenate your partials and append them to template.html
gulp.task('templates', require('./tasks/templates'));

// Build my css (with sass compilation
gulp.task('styles', require('./tasks/styles'));

// Check if the code is correct
gulp.task('lint', require('./tasks/lint'));

// Concat all file js in script (with bowerify // use require)
gulp.task('scripts', ['lint'], require('./tasks/scripts'));

// Move index
gulp.task('index', require('./tasks/index'));

// Move our assets
gulp.task('assets', require('./tasks/assets'));

// Build your i18n files
gulp.task('i18n', require('./tasks/i18n'));

gulp.task('upload', require('./tasks/upload'));

// Set the env config to production
gulp.task('envProd', function () {
    gutil.env.type = 'production';
});

// Set the env config to production
gulp.task('envWatch', function () {
    gutil.env.opt = 'watch';
});

gulp.task('unitTest', require('./tasks/unitTest'));
gulp.task('e2e', ['serve', 'updateWebdriver'], require('./tasks/e2e'));

//Launch the e2e and unit test
gulp.task('test', ['unitTest', 'e2e']);

gulp.task('updateWebdriver', protractor.webdriver_update);

/*******
 * Main TASKS
 */
//Production Build (normal build + git)
gulp.task('prod', ['envProd', 'dev']);

// Dev build
gulp.task('dev', ['index', 'assets', 'vendor', 'templates', 'i18n', 'styles', 'scripts'], function() {
    gulp.start('unitTest');
});

// Dev build + add the watch and the livereload on the sources
gulp.task('serve', ['watch', 'dev'], function () {
    browserSync({
        server : {
            baseDir: config.project + 'build/'
        },
        ui:{
            port: 4000,
            weinre :{
                port:4001
            }
        },
        port: (gutil.env.p ? gutil.env.p : config.defaultPort),
        open:false,
        notify: false
    })
});

// Launch your watch on file
gulp.task('watch', function () {
    gulp.watch([
        config.project + 'src/styles/*.*css',
        config.project + 'src/scripts/**/*.*css'

    ], ['envWatch', 'styles']);
    gulp.watch(config.project + 'src/scripts/**/*.js', ['envWatch', 'scripts', 'unitTest']);
    gulp.watch(config.project + 'src/assets/**/*', ['envWatch', 'assets']);
    gulp.watch(config.project + 'src/scripts/**/*.html', ['envWatch', 'templates']);
    gulp.watch(config.project + 'src/index.html', ['envWatch', 'index']);
    gulp.watch(config.project + 'src/i18n/**', ['envWatch', 'i18n']);
});

// The default task run the prod build
gulp.task('default', ['build']);
