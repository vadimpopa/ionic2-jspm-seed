'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');
var argv = require('yargs').argv;

global.ENV = argv.env;

global.dependencies = {
    scripts: [
      {
        name: 'zone.js', src: 'dist/zone.min.js', dest: 'lib/zone.min.js', env: 'prod'
      },
      {
        src: 'cordova.js', dest: 'lib/cordova.js', env: 'prod'
      },
      {
        src: 'dist/app.min.js', dest: 'app.min.js', env: 'prod'
      },
      { 
        src: 'jspm_packages/system.src.js', env: 'dev'
      },
      {
        src: 'system.config.js', env: 'dev'
      },
      {
        src: 'app/bootstrap.js', env: 'dev'
      }],
    fonts: [
      {
        name: 'ionic', src: 'fonts/**/*.ttf'
      },{
        name: 'ionic', src: 'fonts/**/*.woff'
      }
    ],
    css: [
      {
        src: 'app/app.css', env: 'dev'
      },
      {
        src: 'dist/app.min.css', dest: 'app.min.css', env: 'prod'
      }
    ]
  };

// Specify paths & globbing patterns for tasks.
global.paths = {
  'jsMain': './app/app.js',

  'html': 'index.prod.html',

  'tpl': './app/**/*.html',
  
  // JS sources.
  'js': './app/**/*.js',
  
  // SASS sources.
  'sass': './app/app.ios.scss',
  
  // Image sources.
  'img': './app/img/*',
  
  // Sources folder.
  'src': './',
  
  // Compiled CSS folder.
  'app': './app/',

  'cssFile': 'app.css',
  
  // Distribution folder.
  'dist': './dist',

  // Cordova folder
  'cordova': './cordova',

  'node_modules': './node_modules',

  'systemConfig': './system.config.js',

  'fontsDev' : './fonts',

  'fontsDist' : './dist/fonts',

  'jsDist' : './dist/app.min.js'
};

global.app = {
  name: 'Starter',
  bundleId: 'com.mycompany.starter'
}

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['connect', 'watch']);