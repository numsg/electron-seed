
var ipcHandler;
// var ipcMain = window.nodeRequire('electron').ipcMain;
try{
  ipcHandler = require('../../../../src/app/ipc-handler/ipc-handler');
}catch(err){
  console.log(err.message);
}
describe("ipc-handler", function() {
  // var IPChooks;
  // var IPChooksOnce;
  // beforeEach(()=>{
  //   IPChooks = {};
  //   IPChooksOnce ={};
  //   ipcMain.on = (eventName, fn)=>{
  //     IPChooks[eventName] = IPChooksOnce[eventName] || [];
  //   }
  // })
it('should be promise', function () {
      var handler = ipcHandler();
      expect(handler instanceof Promise).toBeTruthy;
  })
});
