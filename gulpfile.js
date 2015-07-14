"use strict";
/* jshint node: true */
var gulp = require('gulp');
var gls = require('gulp-live-server');
var argv = require('yargs').argv;
var watch, server, config;


gulp.task('server', function() {
	var restart_files = ['./controllers/**/*.js', './app.js'];

	let debug = require('debug')('express-starter');
	let app = require('./app');

	app.set('port', process.env.PORT || 3000);

	let server = app.listen(app.get('port'), function() {
		debug('Express server listening on port ' + server.address().port);
	});
	
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
