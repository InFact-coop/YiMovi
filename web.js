const keystone = require('keystone');
const i18n = require('i18n');

require('dotenv').config();

keystone.init({
  name: 'YiMovi',
  brand: 'YiMovi',

  favicon: 'public/favicon.ico',
  static: 'public',

  views: 'templates/views',
  'view engine': 'pug',

  'auto update': true,
  mongo: process.env.MONGODB_URI,

  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
});

require('./models');

const localeSetup = require('./routes/setup/locales.js');

i18n.configure(localeSetup);

keystone.set('routes', require('./routes'));

keystone.start();
