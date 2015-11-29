'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var angularTemplateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');

// HTML livereload.
gulp.task('html', function() {
  gulp.src(global.paths.html)
    .pipe(connect.reload());
});

gulp.task('templates', function() {
	gulp.src(global.paths.tpl)
    .pipe(angularTemplateCache())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/'))
})
