'use strict';

var createWindow = function (BrowserWindow,configData) {
  var mainWindow;
  // Create the browser window.
  mainWindow = new BrowserWindow(configData.login_window_config)

  var logger = BrowserWindow.logger;

  if(configData.debug_config.isDebug){
    mainWindow.loadURL(configData.debug_config.loadURL); 
    //Open the DevTools.
    if(configData.debug_config.isShowDevTools){
      mainWindow.webContents.openDevTools()
    }
  }else{
    //and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../../../resource/index.html`);
  }

  mainWindow.webContents.on('did-finish-load', function() {
    logger.info("web finish load...");
  })

  mainWindow.webContents.on('did-fail-load', function() {
    logger.info("web fail load...");
  })

  //mainWindow.loadURL('http://localhost:63342/achilles-frontend/build/index.html#/login')

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    logger.info("web closed...");
    mainWindow = null
  })
  return mainWindow;
};

module.exports = createWindow;