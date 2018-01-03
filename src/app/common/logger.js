/**
 * Created by gaoqiang on 2016/6/14.
 */

module.exports = function (options, winston,winstonConfig){
  var logger;
  logger = new winston.Logger({
    transports: [
      //new (winston.transports.Console)({
      //  level: options.verbose ? 'silly' : 'info',
      //  colorize: true,
      //  timestamp: true
      //}),
      new (winston.transports.File)({
        filename: options.logPath,
        level: 'silly',
        colorize: false,
        timestamp: true
      })
    ]
  });
  logger.configure({
    transports: [
      new (winstonConfig)({
        filename:options.logPath,
        datePattern:'.yyyy-MM-dd.log'
      })
    ]
  });
  logger.info('Logger initialized. Writing info/warnings/errors to stdout. '
  + 'Writing all logs to %s',options.logPath);
  return logger;
}
