var config = require('../../nightwatch.conf.js');
const { start, stop } = require('../../server.js')

module.exports = {
  before: (_, done) => start(done),
  after: stop,
  'Home': function(browser) {
    browser
      .url(config.url + '/')
      .waitForElementVisible('body')
      .saveScreenshot(config.imgpath(browser) + 'home.png')
      .pause(2000)
      .end();
  },
};
