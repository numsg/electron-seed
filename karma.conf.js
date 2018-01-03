const path = require('path');
module.exports = function(config) {
  config.set({
    basePath: "./",

    frameworks: ["jasmine"],

    // web server port
    port: 9877,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Electron'
    ],
    electronOpts: {
      title: 'test-shell',
      webPreferences: {
        nodeIntegration: true
      }
    },
    exclude: [],
    files: [
      { pattern: "./karma.shim.js",included: true,},
      //{ pattern: "./src/*.js", watched: true, included: false, served: true }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './karma.shim.js': ['webpack']
    },

    webpack: {
      devtool:'eval-source-map',
      // target: 'node',
      resolve: {
        extensions: [ ".js", ".coffee"]
      },
      externals: {
        'fs': 'fs',
        'electron': 'electron'
      },
      // node:{
      //   global: true,
      //   console: true,
      //   process: true,
      // },
      module: {
        loaders:[
          {
            test: /\.js$/,
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [/\.spec\.js$/, /\.e2e\.js$/, /node_modules/]
          }
        ]
      }
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage-istanbul'], 

    coverageIstanbulReporter:{
      dir: path.join(__dirname, 'build/reports/karma'), //reports/karma
      reports: ['text-summary', 'lcovonly', 'text'],
      fixWebpackSourcePaths: true,
      // 'report-config': {
      //   lcovonly: {
      //     subdir: 'lcov'
      //   }
      // }
    },

    // remapIstanbulReporter: {
    //  src: 'build/reports/karma/coverage-final.json',
    //  reports: {
    //    lcovonly: 'build/reports/karma/lcov.info',
    //    //html: 'build/reports/html',
    //    'text': null
    //  },
    //  timeoutNotCreated: 4000, // default value
    //  timeoutNoMoreFiles: 4000 // default value
    // },

    // coverageReporter: {
    //   dir: 'build/reports',
    //   reporters: [{
    //     type: 'lcovonly',
    //     dir: 'build/reports',
    //     subdir: 'karma',
    //     file: 'lcov.info'
    //   }]
    // },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
