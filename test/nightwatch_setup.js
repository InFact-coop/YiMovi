const { start, stop } = require('../server.js')

module.exports = {
  before: (done) => start(done),
  after: stop
};
