'use strict'

var storage = require('electron-json-storage');

module.exports = function (configDir, fileName){
  return new Promise(function(resovle, reject){
    storage.setDataPath(configDir);
    storage.get(fileName, function(error, configData){
      if(error){
        logger.info(error);
        reject(error);
      }
      resovle(configData);
    })
  })
}