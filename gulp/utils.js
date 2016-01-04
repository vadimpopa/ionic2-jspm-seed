var System  = require('systemjs');
var path    = require('path');
var fs      = require('fs');

module.exports = {
    getJSPMPackagePath: function getJSPMPackagePath(dep) {
        if (Object.keys(System.map).length === 0) {
            eval(fs.readFileSync(global.paths.systemConfig, 'utf8'));
        }

        var src = '/' + dep.src;

        if (dep.name) {     
            var url = System.normalizeSync(dep.name).replace('file:', '');
            var dir = path.resolve(url.substring(0, url.length - 3));

            src = dir + src;
        } 

        return '.' + src;
    }
};

