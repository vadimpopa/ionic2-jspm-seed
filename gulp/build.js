'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var exec = require('child_process').execSync;
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSeq = require('run-sequence');
var sass = require('gulp-sass');
var inlineNg2Template = require('gulp-inline-ng2-template');
var gulp_jspm = require('gulp-jspm');
var minifyCss = require('gulp-minify-css');

function buildJsFast(minify) {
    return gulp.src(global.paths.jsMain)
        .pipe(gulp_jspm({
            selfExecutingBundle: true,
            minify: minify
        }))
        .pipe(inlineNg2Template({base: global.paths.src, css: false}))
        .pipe(rename({
            basename: 'app.min',
            extname: '.js'
        }))
        .pipe(gulp.dest(global.paths.dist));
}

// One build task to rule them all.
gulp.task('build.dist', function (done) {
    gulp.start('clean');
    runSeq('sass', 'build.js', 'build.html', 'copy.css.dist', 'copy.fonts.dist', done);
});

gulp.task('build.js.slow', function (cb) {
    var Builder = require('systemjs-builder');
    var builder = new Builder(global.paths.src, global.paths.systemConfig);

    builder.reset();

    builder.buildStatic("app", global.paths.jsDist, {minify: true})
        .then(function (output) {
            gulp.src(global.paths.jsDist)
                .pipe(inlineNg2Template({base: global.paths.src, css: false}))
                .pipe(gulp.dest(global.paths.dist));

            cb();
        })
        .catch(function (err) {
            console.log(err);
            cb(err);
        });
});

gulp.task('build.js', function () {
    return gulp.src(global.paths.jsMain)
        .pipe(gulp_jspm({
            selfExecutingBundle: true,
            minify: true
        }))
        .pipe(inlineNg2Template({base: global.paths.src, css: false}))
        .pipe(rename({
            basename: 'app.min',
            extname: '.js'
        }))
        .pipe(gulp.dest(global.paths.dist));
});

gulp.task('build.js.debug', function () {
    return buildJsFast(false);
});

gulp.task('build.html', function () {
    gulp.src(global.paths.html)
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest(global.paths.dist));
});

gulp.task('build.img', function () {
    gulp.src(global.paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(global.paths.dist + '/img'));
});

gulp.task('copy.css.dist', function () {
    gulp.src(global.paths.css + global.paths.cssFile)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(global.paths.dist));
});
