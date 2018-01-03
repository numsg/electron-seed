'use strict'

const electron = require('electron');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

var path = require('path');

var logPath = path.join(app.getPath('userData'), 'loginfo');

var winston = require('winston');
var winstonConfig = require('winston-daily-rotate-file')
var setlogger = require('./app/common/logger');

const storage = require('electron-json-storage');

var createWindow = require('./app/main-process/main-window.js');

// global.DEV_MODE = process.evn['TEST_SPEC'] 
//   || process.argv.some(arg => arg ==='dev')
//   || process.argv.some(arg => arg==='publish');

(function(){

  var logOption = {verbose: 'silly', logPath: logPath};

  var logger = setlogger(logOption, winston, winstonConfig);

  var electronInstall = require('./app/common/electron-install');
  if (electronInstall.handleSquirrelEvent(logger)) {
    return;
  }

  // Test globe exception eg: var sd = aa[1];
  require('./app/common/exceptionHandler').register(logger);
 
  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    logger.info('electron app close...');
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', function(){
    logger.info('electron app begin createWindow...');

    var configPromise = require('./app/common/config')(__dirname, 'config');
    configPromise.then(function(configData){
      logger = setlogger(configData.log_config = undefined? logOption: configData.log_config,
         winston, winstonConfig);
      BrowserWindow.logger = logger;
      var mainWindow = createWindow(BrowserWindow, configData);
      require('./app/ipc-handler/ipc-handler')(mainWindow);
      electronInstall.autoUpdate();
      logger.info('electron app end createWindow...');
    });
  });
  var crashReporter = electron.crashReporter;

  crashReporter.start({
    productName: 'shell-electron-seed',
    companyName: 'gsafety',
    submitURL: 'http://numsg.com',
    autoSubmit: true
  });

})()

module.exports = app;