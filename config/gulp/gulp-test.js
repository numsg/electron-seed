var gulp = require('gulp');
var shell = require('gulp-shell');

// 运行单元测试
gulp.task('test', shell.task([
  'npm test'
]));