"use strict";
/* jshint node: true */
var gulp = require('gulp');
var gls = require('gulp-live-server');
var argv = require('yargs').argv;
var watch, server, config;


gulp.task('server', function(){
	server = server || gls.new(['--harmony', 'index.js'], null, false);
	var restart_files = ['./app/**/*.js', './index.js'];

	server.start();

	if( argv.autorestart )
	{
		watch = watch || require('gulp-watch');
		
		gulp.src(restart_files)
			.pipe(watch(restart_files, {ignoreInitial: true}, function(){
			console.log('restarting server');
			server.start.bind(server)();
		}));
	}
});

gulp.task('pre-commit', function(){
	var guppy = require('git-guppy')(gulp);
	var gulpFilter = require('gulp-filter');
	var jshint = require('gulp-jshint');
	config = config || require('./package');
	
	return gulp.src(guppy.src('pre-commit'))
		.pipe(gulpFilter(['*.js']))
		.pipe(jshint(config.jshintConfig))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});