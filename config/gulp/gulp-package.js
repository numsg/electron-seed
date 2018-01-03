var gulp = require('gulp');
var config = require('../gulp.config');
var packager = require('electron-packager');
var package = require('../../package.json')
var gutil = require('gulp-util');
var path = require('path');
var electronInstaller = require('electron-winstaller');

var commonOptions = {
  dir: './build/temp',
  out: './build/output',
  asar: {
    unpack: '**/config.json'
  },
  version: config.version,
  ignore: [
    // 'index.js',
    // 'src/config.json',
    'package-lock.json'
  ],
  name: config.name,
  buildVersion: config.version,
  appVersion: config.version,
  appCopyright: 'Copyright © 2017 gsafety',
  overwrite: true
}

// win32 x64平台打包
gulp.task('packager-win32-x64', function (callback) {
  var win32Options = {
    platform: 'win32',
    arch: 'x64',
    win32metadata: {
      CompanyName: 'gsafety',
      FileDescription: 'electron-seed',
      OriginalFilename: 'electron.exe',
      ProductName: 'electron-seed',
      InternalName: 'electron-seed'
    }
  };
  var options = Object.assign(commonOptions, win32Options);
  packager(options, function (err, appPaths) {
    callback();
  })
})


// windows安装包
gulp.task('installer-win32-x64', function (callback) {
  var options = {
    appDirectory: `./build/output/${config.name}-win32-x64`,
    outputDirectory: `./dist/${config.name}-win32-x64`,
    authors: config.author,
    exe: `${config.name}.exe`,
    noMsi:'true',
    name: config.name,//.replace(/-/g, ''),
    version: config.version,

    setupExe: `${config.name}-v${config.version}-setup.exe`,
    setupMsi: `${config.name}-v${config.version}-setup.msi`
  }

  var resultPromise = electronInstaller.createWindowsInstaller(options)
  gutil.log('Creating installer for platform win32 x64 installer', gutil.colors.gray('(this may take a while)'))
  resultPromise.then(() => {
    gutil.log('Installer was created successfully');
    gutil.log('Installer is saved in', getFullPath(options.outputDirectory));
    callback();
  }, (e) => {
    gutil.log(`Error: ${e.message}`)
  })
})

function getFullPath(p) {
  return gutil.colors.yellow(path.resolve(p));
}