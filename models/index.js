const keystone = require('keystone');
keystone.set('cloudinary config', process.env.CLOUDINARY);

require('./users.js');
require('./directors.js');
require('./themes.js');
require('./genres.js');
require('./movies.js');
require('./about_us.js');
