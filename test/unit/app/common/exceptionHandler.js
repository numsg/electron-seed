var exceptionHandler;
var mockLogger = {
  info: function(message){

  }
}
try{
  exceptionHandler = require('../../../../src/app/common/exceptionHandler').register;
  console.log(exceptionHandler);
}catch(err){
  console.log(err.message);
}
process.type = 'browser';
describe("exception-handler", function() {
  it('should be function', function () {
     exceptionHandler(mockLogger);
      // expect(exceptionHandler instanceof Function).toBeTruthy;
  })

  it('should be function', function () {
    
  })

});