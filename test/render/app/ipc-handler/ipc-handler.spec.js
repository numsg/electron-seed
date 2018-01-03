
try{
  var obj = require('../../../../src/app/ipc-handler/ipc-handler');
  var ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.send('loginSucceedEvent');
}catch(err){
  console.log(err.message);
}
describe("Test window", function() {
  var flag =true;
 
  it('shows createWindow success', function () {
    // expect(flag).toBeTruthy();
  })
});
