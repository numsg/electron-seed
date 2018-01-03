

var ipc = require('electron').ipcMain;
var ipcPromise = require('../common/config')(__dirname, 'ipc');

module.exports = function (mainWindow) {
  ipcPromise.then(function(ipcOption){
    ipc.on(ipcOption.sys_event.exitApp,function() {
      mainWindow.close();
    });

    ipc.on(ipcOption.login_event.loginSucceedEvent,function() {
      mainWindow.setBounds({x: 0, y: 0, width: 1440, height: 900});
    });
  })
  return ipcPromise;
};
