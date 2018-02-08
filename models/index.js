const keystone = require('keystone');
keystone.set('cloudinary config', process.env.CLOUDINARY);

require('./users.js');
require('./directors.js');
require('./themes.js');
require('./genres.js');
require('./resources.js');
require('./movies.js');
require('./video.js');
require('./about_us.js');
require('./team.js');
