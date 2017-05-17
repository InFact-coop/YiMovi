const keystone = require('keystone');
const types = keystone.Field.Types;

const Genre = new keystone.List('Genre', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Genres',
});

Genre.add({
  name: { type: String, required: true, },
  description: { type: types.Markdown, required: false, },
  //image: { type: types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Genre.track = true;
Genre.register();
