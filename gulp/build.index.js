var gulp    = require('gulp');
var inject = require('gulp-inject');
var gulpIf = require('gulp-if');
var minifyHtml = require('gulp-htmlmin');
var utils = require('./utils');

gulp.task('build.index', function () {
    var env = global.ENV;
    var isProd = env === 'prod';
    var srcHtml = (isProd ? global.paths.dist  : '.') + '/index.html';
    var destination = (isProd ? global.paths.dist : global.paths.src);

    function injectJS() {
        var deps = global.dependencies.scripts.filter(function(pkg) {
            return pkg.env === env;
        });

        return inject(gulp.src(deps.map(utils.getJSPMPackagePath), {read: false}), {
            transform: function (filepath, file) {
                var dest = filepath;
                var pkg;

                pkg = deps.find(function(pkg){
                    return filepath.indexOf(pkg.src) > -1 && pkg.dest;
                });

                return '<script src="'+ (pkg ? pkg.dest : filepath) +'"></script>'
        }});
    }

    function injectCSS() {
        var deps = global.dependencies.css.filter(function(pkg) {
            return pkg.env === env;
        });
        var sources = gulp.src(deps.map(function(pkg) {
                return pkg.src;
            }, {read: false}));

        return inject(sources, {
            transform: function (filepath, file) {
                var dest = filepath;
                var pkg;

                pkg = deps.find(function(pkg){
                    return filepath.indexOf(pkg.src) > -1 && pkg.dest;
                });

                return '<link rel="stylesheet" href="' + (pkg ? pkg.dest : filepath) + '">'
            }
        });
    }

    return gulp.src(srcHtml)
        .pipe(injectJS())
        .pipe(injectCSS())
        .pipe(gulpIf(isProd, minifyHtml()))
        .pipe(gulp.dest(destination));
});
 
