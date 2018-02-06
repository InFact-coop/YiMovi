const keystone = require('keystone');

require('dotenv').config();

const User = keystone.list('User');

exports = module.exports = done => {
  new User.model({
    name: { first: 'Admin', last: 'User', },
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    canAccessKeystone: true,
  }).save(done);
};
