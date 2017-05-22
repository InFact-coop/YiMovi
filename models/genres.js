const keystone = require('keystone');
const Types = keystone.Field.Types;

const Genre = new keystone.List('Genre', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Genres',
});

Genre.add({
  name: { type: String, required: true, },
  description: { type: Types.Textarea, required: false, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Genre.track = true;
Genre.register();
