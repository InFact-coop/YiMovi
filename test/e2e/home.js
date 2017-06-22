var config = require('../../nightwatch.conf.js');

module.exports = {
  'Home': function(browser) {
    browser
      .url(config.URL + '/')
      .waitForElementVisible('body')
      // .assert.title('Should Fail')
      .saveScreenshot(config.imgpath(browser) + 'home.png')
      .end();
  },
};
