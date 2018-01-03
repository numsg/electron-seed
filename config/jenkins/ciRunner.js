/**
 * Created by tanjie on 2016/1/22.
 */

var exec = require('child_process').exec;

var ci= function () {
  exec('npm install', function (error, stdout, stderr) {
    if(error!==null){
      console.log(error);
      return process.exit(1);
    }
    console.log(stdout);
    exec('npm run build', function (error, stdout, stderr) {
      if (error !== null) {
        console.log(error);
        console.log(stdout);
        return process.exit(1);
      }
      console.log(stdout);
    });
  });
}

ci();
