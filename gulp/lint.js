'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');
var tslint = require('gulp-tslint');
var tslintStylish = require('gulp-tslint-stylish');
var scsslint = require('gulp-scss-lint');

// Lint JS.
gulp.task('lint.js', function () {
  return gulp.src(global.paths.js)
  .pipe(cache('lint.js'))
  .pipe(tslint())
  .pipe(tslint.report(tslintStylish, {
	    emitError: false,
	    sort: true,
	    bell: true
	  }));
});

// Lint SASS.
gulp.task('lint.sass', function () {
  return gulp.src(global.paths.sass)
    .pipe(cache('lint.sass'))
    .pipe(scsslint());
});

// Lint all the things!
gulp.task('lint', ['lint.js', 'lint.sass']);
