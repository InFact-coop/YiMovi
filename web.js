const keystone = require('keystone');
const i18n = require('i18n');

require('dotenv').config();

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

i18n.configure({
  locales: [ 'en', 'de', ],
  directory: __dirname + '/locales',
});

keystone.set('routes', require('./routes'));

keystone.start();
