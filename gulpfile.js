'use strict';

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
        }, {
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
    'js': './app/**/*.js',
    'sass': './app/app.ios.scss',
    'img': './app/img/*',
    'src': './',
    'app': './app/',
    'cssFile': 'app.css',
    'dist': './dist',
    'cordova': './cordova',
    'node_modules': './node_modules',
    'systemConfig': './system.config.js',
    'fontsDev': './fonts',
    'fontsDist': './dist/fonts',
    'jsDist': './dist/app.min.js'
};

global.app = {
    name: 'Starter',
    bundleId: 'com.mycompany.starter'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {recurse: false});

// Default task; start local server & watch for changes.
gulp.task('default', ['connect', 'watch']);
