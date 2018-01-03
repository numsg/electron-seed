// var electron = window.top.require('electron');

window.nodeRequire = window.top.require;
window.__dirname = window.top.__dirname;

window.nodeRequire("module").globalPaths.push("./node_modules");

window.fs = window.nodeRequire('fs');
window.electron = window.nodeRequire('electron');

// var testsContext = require.context("./test", true, /\.spec\.js/);
var testsContext = require.context("./test", true, /.js/);
testsContext.keys().forEach(testsContext);