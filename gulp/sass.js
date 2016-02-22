'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassResolver = require('./sassresolver.js');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ['jspm_packages/npm/ionicons@3.0.0-alpha.3/dist/scss']
};

// Compile SASS with sourcemaps + livereload.
gulp.task('sass', function() {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sassResolver({systemConfig: global.paths.systemConfig}))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat(global.paths.cssFile))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.app))
    .pipe(connect.reload());
});