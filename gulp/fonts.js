'use strict';

var gulp = require('gulp');
var System  = require('systemjs');
var path    = require('path');
var fs      = require('fs');

gulp.task('fonts', function () {
	eval(fs.readFileSync(global.paths.systemConfig, 'utf8'));

 	var ionicUrl = System.normalizeSync('ionic');
  	var ionicDir = path.resolve(ionicUrl.replace('file:', '').replace('.js', ''));

  	ionicDir = "." + ionicDir + "/dist/"

 return gulp.src([
	    ionicDir + 'fonts/**/*.ttf',
	    ionicDir + 'fonts/**/*.woff'
	])
    .pipe(gulp.dest(global.paths.fonts));
});