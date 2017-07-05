const keystone = require('keystone');
const AboutUs = keystone.list('About_us');

exports = module.exports = (done) => {

  new AboutUs.model({
    name: 'About us main',
    text: { html: 'text', },
  }).save(done);
};
