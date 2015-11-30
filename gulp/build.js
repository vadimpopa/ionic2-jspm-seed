'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var exec = require('child_process').execSync;
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSeq = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var inlineNg2Template = require('gulp-inline-ng2-template');
var gulp_jspm = require('gulp-jspm');

// One build task to rule them all.
gulp.task('build_dist', function (done) {
  console.log('run seq');
  gulp.start('clean');
  runSeq('sass','buildjs_fast', 'buildhtml', 'copy_css_to_dist', 'fonts_dist', done);
});

gulp.task('bundle-debug', function (cb) {
  var Builder = require('systemjs-builder');
  var builder = new Builder("./","system.config.js");
    
    builder.reset();

    builder.buildStatic("app", "dist/app.min.js")
    .then(function() {
      console.log('Bundle complete');
      cb();
    })
    .catch(function(err) {
      console.log(err);
      cb(err);
    });
});

gulp.task('buildjs', function (cb) {
  var Builder = require('systemjs-builder');
  var builder = new Builder(global.paths.src, global.paths.systemConfig);
    
  builder.reset();

  builder.buildStatic("app", global.paths.jsDist, {minify: true})
    .then(function (output) {
      gulp.src(global.paths.jsDist)
        .pipe(inlineNg2Template({ base: global.paths.src, css: false}))
        .pipe(gulp.dest(global.paths.dist));

        cb();
  })
  .catch(function(err) {
    console.log(err);
    cb(err);
  });
});

//buildjs produces same as this one
gulp.task('buildjs_fast', function(){
    return gulp.src('app/app.ts')
        .pipe(gulp_jspm({
          selfExecutingBundle: true
        }))
        .pipe(inlineNg2Template({ base: global.paths.src, css: false }))
        .pipe(rename({
          basename: 'app.min',
          extname: '.js'
        }))
        .pipe(gulp.dest(global.paths.dist));
});

gulp.task('copy_css_to_dist', function () {
  gulp.src(global.paths.css + global.paths.cssFile)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest(global.paths.dist));
});

// Build HTML for distribution.
gulp.task('buildhtml', function () {
  gulp.src(global.paths.html)
    .pipe(rename({
          basename: 'index'
      }))
    .pipe(minifyHtml())
    .pipe(gulp.dest(global.paths.dist));
});

// Build images for distribution.
gulp.task('buildimg', function () {
  console.log('buildimg');
  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + '/img'));
});
