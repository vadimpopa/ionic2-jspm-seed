'use strict';

var gulp = require('gulp');
var utils = require('./utils');

function getIonicFontsPaths() {
	return global.dependencies.fonts.map(utils.getJSPMPackagePath);
}

gulp.task('copy.fonts.dev', function () {
 return gulp.src(getIonicFontsPaths()).pipe(gulp.dest(global.paths.fontsDev));
});

gulp.task('copy.fonts.dist', function () {
 return gulp.src(getIonicFontsPaths()).pipe(gulp.dest(global.paths.fontsDist));
});

