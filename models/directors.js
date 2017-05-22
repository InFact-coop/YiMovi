const keystone = require('keystone');
const Types = keystone.Field.Types;

const Director = new keystone.List('Director', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Directors',
});

Director.add({
  name: { type: String, required: true, },
  name_chn: { type: String, label: 'Chinese name', },
  description: { type: Types.Textarea, required: false, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Director.track = true;
Director.register();
