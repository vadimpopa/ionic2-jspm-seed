'use strict';
var gutil   = require('gulp-util');
var through = require('through2');
var fs      = require('fs');
var System  = require('systemjs');
var RSVP    = require('rsvp');
var Promise = require('rsvp').Promise;
var path    = require('path');

var regex     = /@import(Path)?\s*['"](~.*)['"]/mig;
var regexFile = /@import\s*['"](~.*)['"]/mig;
var regexPath = /@importPath\s*['"](~.*)['"]/mig;

module.exports = function(options) {
	if (!options || !options.systemConfig) {
		throw new gutil.PluginError('gulp-systemjs-resolver', '`systemConfig` required');
	}

	if (!options.includePaths) {
		options.includePaths = [];
	}

	if (Object.keys(System.map).length === 0) {
		eval(fs.readFileSync(options.systemConfig, 'utf8'));
	}

	return through.obj(function(file, enc, cb) {
		var replacements = [],
				self         = this;

		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-systemjs-resolver', 'Streaming not supported'));
			return;
		}

		/**
		 * Use systemjs to resolve include files
		 * @param val
		 * @param i
		 * @param {Boolean} isPath
		 * @returns {*}
		 */
		function resolve(val, i, isPath) {
			val = val.replace('~', '');

			return Promise.resolve(System.normalize(val))
					.then(function(normalized) {
						return System.locate({name: normalized, metadata: {}});
					})
					.then(function(address) {
						if (isPath) {
							options.includePaths.push(
									path.resolve(address.replace('file:', '').replace('.js', ''))
							);
						} else {
							var originalRelativePath      = path.relative(
									path.dirname(file.path),
									path.resolve(address.replace('file:', '').replace('.js', ''))
							);
							
							replacements[i] = '..' + path.resolve(address.replace('file:', '').replace('.js', ''))
						}
					});
		}

		/**
		 * Wrapper for resolve File
		 * @param val
		 * @param i
		 * @returns {*}
		 */
		function resolveFile(val, i) {
			return resolve(val, i, false);
		}

		/**
		 * Wrapper for resolve Path
		 * @param val
		 * @param i
		 * @returns {*}
		 */
		function resolvePath(val, i) {
			return resolve(val, i, true);
		}

		/**
		 * Extract the file path from @import "filepath"
		 * @param val
		 * @returns {XML|string|void}
		 */
		function extractFile(val) {
			return val.replace(regex, '$2');
		}

		/**
		 * Resolve the imports
		 * @param fileContent
		 */
		function resolveAll(fileContent) {
			var matches      = [].concat(fileContent.match(regexFile)).filter(Boolean).map(extractFile);
			var pathsMatches = [].concat(fileContent.match(regexPath)).filter(Boolean).map(extractFile);

			if (matches.length === 0 && pathsMatches.length === 0) {
				return new RSVP.Promise(function(resolve) {
					resolve(fileContent)
				});
			}

			var promises      = [].concat(matches.map(resolveFile)).filter(Boolean);
			var promisesPaths = [].concat(pathsMatches.map(resolvePath)).filter(Boolean);

			return RSVP.all(promises.concat(promisesPaths)).then(function() {
				for (var i = 0, len = matches.length; i < len; i++) {
					fileContent = fileContent.replace(matches[i], replacements[i]);
				}
				return fileContent;
			});

		}

		resolveAll(file.contents.toString()).then(function(newFileContent) {
			file.contents = new Buffer(newFileContent);
		}).catch(function(err) {
			self.emit('error', new gutil.PluginError('gulp-systemjs-resolver', err));
		}).finally(function() {
			self.push(file);
			cb();
		});
	});
};
