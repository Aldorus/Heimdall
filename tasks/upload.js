var gulp = require('gulp'),
    streamqueue = require('streamqueue'),
    ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    prompt = require('gulp-prompt'),
    config = require('../GulpConfig');
/**
 * Upload everything on ftp
 */
module.exports = function () {
    var stream = streamqueue({objectMode: true});

    var username = 'guillaume';
    var password =  'Gueux1234#';

    //// Prompt
    //stream.queue(
    //    gulp.src(config.dist + '/index.html')
    //        .pipe(prompt.prompt([
    //            {
    //                type: 'input',
    //                name: 'username',
    //                message: 'Your username'
    //            },
    //            {
    //                type: 'password',
    //                name: 'password',
    //                message: 'Your password'
    //            }
    //        ], function(res){
    //            username = res.username;
    //            password = res.password;
    //        }))
    //);

    //return stream.done(
    var con = ftp.create({
        host: 'rousselguillaume.fr',
        user: username,
        pass: password,
        log: gutil.log
    });

    gulp.src('./build/**/*', {base:'.', buffer: true})
            //.pipe(con.newerOrDifferentSize('Skirnir2'))
            .pipe(con.dest('test'));
        //.pipe(gutil.noop());

    //);
};
