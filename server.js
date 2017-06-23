const keystone = require('keystone');

require('dotenv').config();

const start = done => {
  keystone.init({

    'name': 'YiMovi',
    'brand': 'YiMovi',

    'favicon': 'public/favicon.ico',
    'static': 'public',

    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true,
    'mongo': process.env.MONGODB_URI,

    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': process.env.COOKIE_SECRET,

  });

  require('./models');

  keystone.set('routes', require('./routes'));

  keystone.start({ onStart: done });
};

const stop = () => {
  process.exit();
};

module.exports = {
  start,
  stop,
};
