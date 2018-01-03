var config;
try{
  config = require('../../../../src/app/common/config');
}catch(err){
  console.log(err.message);
}
describe("config", function() {
  it('return should be promise', function () {
      var configPromise = config();
      expect(configPromise instanceof Promise).toBeTruthy;
  })

  it('promise should exec resolve ', function () {
    var path = require('path');
    var configPromise = config(path.join(__dirname , '../../../../src/'),'config');
  })

  it('promise should exec reject', function () {
    var configPromise = config('/','json');
  })

});