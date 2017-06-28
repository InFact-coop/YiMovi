const keystone = require('keystone');
const Types = keystone.Field.Types;

const Director = new keystone.List('Director', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Directors',
  sortable: true,
});

Director.add({
  name: { type: String, required: true, },
  name_chn: { type: String, label: 'Chinese name', }, // not a 'localized' value, as we need Chinese name in English views too
  description: { type: Types.Markdown, required: false, },
  description___chn: { type: Types.Markdown, label: 'description CHN', collapse: true, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Director.track = true;
Director.register();
