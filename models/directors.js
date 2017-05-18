const keystone = require('keystone');
const types = keystone.Field.Types;

const Director = new keystone.List('Director', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Directors',
});

Director.add({
  name: { type: String, required: true, },
  name_chn: { type: String, label: 'Chinese name', },
  description: { type: types.Textarea, required: false, },
  //image: { type: types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Director.track = true;
Director.register();
