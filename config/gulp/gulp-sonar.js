var gulp = require('gulp');
var config = require('../gulp.config');
var sonar = require('gulp-sonar');
var package = require('../../package.json');


gulp.task('sonar', function () {
  var option = {
    sonar: {
      host: {
        url: config.sonarSetting.host
      },
      login: config.sonarSetting.username,
      password: config.sonarSetting.password,
      exclusions: 'src/app/common/electron-install.js',
      coverage: {
        exclusions:'src/app/ipc-handler/ipc-handler.js,src/app/common/exceptionHandler.js,src/app/common/electron-install.js,src/app/main-process/main-window.js,src/app/common/logger.js'
      },
      projectKey: package.name,
      projectName: package.name,
      projectVersion: package.version,
      sources: './src/app',
      language: 'js',
      sourceEncoding: 'UTF-8',
      javascript: {
        lcov: {
          reportPath: 'build/reports/karma/lcov.info'
        }
      },
      exec: {
        maxBuffer: 1024 * 1024
      }
    }
  }

  return gulp.src('thisFileDoesNotExist.js', {
      read: false
    })
    .pipe(sonar(option))
});