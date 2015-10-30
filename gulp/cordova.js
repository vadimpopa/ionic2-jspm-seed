'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var runSeq = require('run-sequence');
var rename = require('gulp-rename');

//Clean all cordova platforms, so they will need to be generated again.
gulp.task ('cordova:clear', function(done) {
	var paths = [
		global.paths.cordova +'/platforms/*', 
		global.paths.cordova + '/plugins/*'
	];

	del(paths, done);
});

gulp.task ('cordova:clear-platforms', function(done) {
	del([global.paths.cordova +'/platforms/*'], done);
});

gulp.task ("cordova:create-cordova", function(done) {
	del(global.paths.cordova, done);
	exec(global.paths.node_modules + "/cordova/bin/cordova create cordova " + global.app.bundleId + " " + global.app.name, done);
});

gulp.task ("cordova:add-platform-ios", function(done) {
	exec("../" + global.paths.node_modules + "/cordova/bin/cordova -d platform add ios", {
		cwd: process.cwd() + "/cordova"
	},done);
});

gulp.task ("cordova:add-platform-android", function(done) {
	exec("../" + global.paths.node_modules + "/cordova/bin/cordova -d platform add android", {
		cwd: process.cwd() + "/cordova"
	},done);
});

gulp.task("cordova:add-platforms", ['cordova:add-platform-ios' , 'cordova:add-platform-android']);

gulp.task ("cordova:new-project", function(done) {
	runSeq("cordova:create-cordova", "cordova:add-platforms", done);
});

gulp.task("cordova:move-prod", function() {
	var resources = [
		['dist/index.html'],
		['dist/app.min.js'],
		['dist/app.min.css']
		// ['system.config.js'],
		// ['jspm_packages/*', 'jspm_packages']
	];

	resources.map(function(res) {
        var target = global.paths.cordova + '/www/' + (res[1] ? res[1] : ''),
            process = gulp.src(res[0]);

        process.pipe(gulp.dest(target));
    });
});

gulp.task("cordova:build", function(done) {
	runSeq("build", "cordova:move-prod", done);
});

gulp.task("cordova:run-android", function() {
  exec(global.paths.node_modules + "/cordova/bin/cordova run android --device");
});

gulp.task("cordova:run-android", function() {
  exec(global.paths.node_modules + "/cordova/bin/cordova run android --device");
});


gulp.task("cordova:emulate-ios", function(done) {
	exec("../" + global.paths.node_modules + '/cordova/bin/cordova emulate ios --target="iPhone-6"', {
		cwd: process.cwd() + "/cordova"
	},done);
});







