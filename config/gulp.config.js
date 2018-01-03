var helpers = require('./helpers');
var args = require('yargs').argv;
var util = require('gulp-util');
var package = require('../package.json');

var build_dir = '';
var ext = '';

if (args.release || args.aot) {
  util.log('===== release =====');
  build_dir = helpers.root('dist');
  ext = '.min'
} else {
  util.log('===== debug =====');
  build_dir = helpers.root('build');
}
util.log(util.colors.green(package.name), ':', util.colors.yellow(package.version));

module.exports = {
  name: package.name,
  version: package.version,
  author: package.author,
  resuorcePatch: '@gsafety/angular-seed/dist',//@gsafety/achilles-frontend
  build: {
    root: build_dir,
    themes: build_dir + '/themes',
    libs: build_dir + '/libs',
    scripts: build_dir + '/scripts',
    assets: build_dir + '/assets',
    ocr: build_dir + '/ocr'
  },
  sonarSetting: {
    host: 'http://127.0.0.1:9000',
    username: 'test',
    password: 'test'
  },
  nexusSetting: {
    host: '172.18.24.51',
    username: 'root',
    password: 'root123',
    dest: '/opt/sonatype-work/nexus/storage/'
  }
};