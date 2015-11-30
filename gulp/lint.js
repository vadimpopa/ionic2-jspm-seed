'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');
var tslint = require('gulp-tslint');
var tslintStylish = require('gulp-tslint-stylish');
var scsslint = require('gulp-scss-lint');

// Lint JS.
gulp.task('lintjs', function () {
  return gulp.src(global.paths.js)
  .pipe(cache('lintjs'))
  .pipe(tslint())
  .pipe(tslint.report(tslintStylish, {
	    emitError: false,
	    sort: true,
	    bell: true
	  }));
});

// Lint SASS.
gulp.task('lintsass', function () {
  return gulp.src(global.paths.sass)
    .pipe(cache('lintsass'))
    .pipe(scsslint());
});

// Lint all the things!
gulp.task('lint', ['lintjs', 'lintsass']);
