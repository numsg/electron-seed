module.exports.register = function(logger){
  if(process.type === 'browser'){
    process.on('uncaughtException', function(error){
      logger.info(error);
    })
    process.on('unhandledRejection', function(error){
      logger.info(error);
    })
  }
}