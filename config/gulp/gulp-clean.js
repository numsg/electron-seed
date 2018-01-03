var gulp = require('gulp');
var del = require('del');

// 清除开发时构建目录
gulp.task('clean', function () {
  return del(['build']);
});

// 清理发布时构建目录
gulp.task('clean-dist', function () {
  return del(['dist']);
});


// 清理发布时构建目录(带有aot预编译)
gulp.task('clean-aot', function () {
  return del(['dist', 'compiled']);
});
