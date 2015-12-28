'use strict';

var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var connect = require('gulp-connect');
var concat = require('gulp-concat');


gulp.task('js', function() {
  gulp.src(global.paths.js)
      .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(global.paths.html)
      .pipe(connect.reload());
});

// Watch for changes.
gulp.task('watch', function(){
  gulp.watch([global.paths.js], ['lint.js', 'js']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['lint.sass', 'sass']).on('change', logChanges);
  gulp.watch([global.paths.html], ['html']).on('change', logChanges);
});

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}
