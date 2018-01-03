/* eslint-disable */

const app = require('electron').app;

const ChildProcess = require('child_process');
const path = require('path');
const appFolder = path.resolve(process.execPath, '..');
const rootAtomFolder = path.resolve(appFolder, '..');
const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
const exeName = path.basename(process.execPath);
const autoUpdater = require('electron').autoUpdater;
const dialog = require('electron').dialog;
const server =  require('../../../package.json').autoUpdateServer;
const appVersion = require('../../../package.json').version;
const feed = `${server}/update/${process.platform}/${appVersion}`;

function spawn(command, args) {
  return ChildProcess.spawn(command, args, {
    detached: true
  });
};

function spawnUpdate(args) {
  return spawn(updateDotExe, args);
};

autoUpdater.setFeedURL(feed);

function autoUpdate() {
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 60000);
}

autoUpdater.on('update-available', (event) => {});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
});

autoUpdater.on('error', message => {
  // const dialogOpts = {
  //   type: 'info',
  //   buttons: ['Restart', 'Later'],
  //   title: 'error',
  //   message: 'error',
  //   detail: message.stack
  // }
  // dialog.showMessageBox(dialogOpts, (response) => {});
});

const handleSquirrelEvent = function (logger) {
  if (process.argv.length === 1) {
    return false;
  }
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-uninstall':
      spawnUpdate(['--removeShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
    // case '--squirrel-firstrun':
    //   return true;
    default:
      return false;
  }
};

module.exports = {
  handleSquirrelEvent: handleSquirrelEvent,
  autoUpdate: autoUpdate
};
