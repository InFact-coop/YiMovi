const keystone = require('keystone');
const types = keystone.Field.Types;

const User = new keystone.List('User');

User.add({
  name: { type: types.Name, required: true, index: true, },
  email: { type: types.Email, initial: true, required: true, index: true, },
  password: { type: types.Password, initial: true, },
  canAccessKeystone: { type: Boolean, initial: true, },
});

User.register();
