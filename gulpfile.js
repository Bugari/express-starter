"use strict";
/* jshint node: true */
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
//let argv = require('yargs').argv;
let config = require('./package');
let jshint = require('gulp-jshint');


gulp.task('server', function() {
    nodemon({ script: 'app.js',
            ext: 'html js css',
            tasks: ['lint'],
            env: {'DEBUG': 'server'}

    })
    .on('restart', function () {
        console.log('server restarted!');
    });
});

gulp.task('lint', function() {
    return gulp.src(['./controllers/*.js'])
       .pipe(jshint(config.jshintConfig))
       .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('pre-commit', function(){
    let guppy = require('git-guppy')(gulp);
    let gulpFilter = require('gulp-filter');

    return gulp.src(guppy.src('pre-commit'))
    .pipe(gulpFilter(['*.js']))
    .pipe(jshint(config.jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
