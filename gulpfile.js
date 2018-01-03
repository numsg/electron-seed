var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./config/gulp/gulp-changelog');
require('./config/gulp/gulp-clean');
require('./config/gulp/gulp-test');
require('./config/gulp/gulp-sonar');
require('./config/gulp/gulp-copy');
require('./config/gulp/gulp-package');

var _callback = null;

gulp.task('default', function (callback) {

  _callback = callback;
  return runSequence(
    'clean',
    'test',
    'sonar',
    'copyInstallDep',
    'packager-win32-x64',
    runTaskCallback
  );
});

gulp.task('dist', function (callback) {
  
  _callback = callback;
  return runSequence(
    'clean',
    'test',
    'sonar',
    'copyInstallDep',
    'packager-win32-x64',
    'installer-win32-x64',
    runTaskCallback
  );
});

function runTaskCallback(error) {
  if (error) {
    console.log(error.message);
    return process.exit(1);
  } else {
    console.log('BUILD TASK FINISHED SUCCESSFULLY');
  }
  if (_callback)
    _callback(error);
}
  