const keystone = require('keystone');
const Types = keystone.Field.Types;

const Theme = new keystone.List('Theme', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Themes',
  sortable: true,
});

Theme.add({
  name: { type: String, required: true, },
  name___chn: { type: String, label: 'name CHN', },
  description: { type: Types.Markdown, required: false, },
  description___chn: { type: Types.Markdown, label: 'description CHN', collapse: true, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
});

Theme.track = true;
Theme.register();
