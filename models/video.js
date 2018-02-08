const keystone = require('keystone');
const Types = keystone.Field.Types;

const Video = new keystone.List('Video', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Videos',
  sortable: true,
});

Video.add({
  name: { type: String, required: true, },
  caption: { type: Types.Markdown, label: 'Caption', collapse: true, },
  videoUrl: { type: Types.Url, label: 'UCL Video URL', collapse: true, },
});

Video.track = true;
Video.register();
