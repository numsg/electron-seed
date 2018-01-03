var gulp = require('gulp');
var fs = require('fs');
var shell = require('gulp-shell');
var config = require('../gulp.config');

gulp.task('copySrc', function(callback){
  fs.mkdir('build/temp/src', function () {
    gulp.src(['./src/**'])
      .pipe(gulp.dest('./build/temp/src'));
    callback();
  });
});

gulp.task('copyResource',['copySrc'],function(callback){
  fs.mkdir('build/temp/resource', function () {
    gulp.src(['./node_modules/'+ config.resuorcePatch +'/**'])//
      .pipe(gulp.dest('./build/temp/resource'));
    callback();
  })
});

gulp.task('copyPackage',['copyResource'],function(callback){
  fs.mkdir('build/temp/', function () {
    gulp.src(['./package.json'])
      .pipe(gulp.dest('./build/temp/'));
    callback();
  })
});

gulp.task('copyIndex',['copyPackage'],function(callback){
  fs.mkdir('build/temp/', function () {
    gulp.src(['./index.js'])
      .pipe(gulp.dest('./build/temp/'));
    callback();
  })
});

gulp.task('copyInstallDep' ,['copyIndex'], shell.task([
  'cd ./build/temp && npm install --production'
]));
