var config = require('../../nightwatch.conf.js');
var server;

module.exports = {
  before: function (browser, done) {
    server = require('../../web')(done); // done
  },
  after: function () {
    server.close();
  },
  'Home': function(browser) {
    browser
      .url(config.URL + '/')
      .waitForElementVisible('body')
      // .assert.title('Should Fail')
      .saveScreenshot(config.imgpath(browser) + 'home.png')
      .end();
  },
};
