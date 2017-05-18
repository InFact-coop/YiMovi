const keystone = require('keystone');
const Types = keystone.Field.Types;

const Director = new keystone.List('Director', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Directors',
});

Director.add({
  name: { type: String, required: true, },
  description: { type: Types.Textarea, required: false, },
  //image: { type: types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Director.track = true;
Director.register();
