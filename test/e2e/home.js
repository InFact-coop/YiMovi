var config = require('../../nightwatch.conf.js');

module.exports = {
  'Home': function(browser) {
    browser
      .url(config.url + '/')
      .waitForElementVisible('body')
      .pause(2000)
      .end();
  },
};
