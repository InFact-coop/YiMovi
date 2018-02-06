const keystone = require('keystone');
const Types = keystone.Field.Types;

const Team = new keystone.List('Team', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Team',
});

Team.add({
  name: { type: String, },
  text: { type: Types.Markdown, label: 'About us text EN', },
  text___chn: { type: Types.Markdown, label: 'About us text CHN', },
  image: {
    type: Types.CloudinaryImage,
    publicID: 'slug',
    autoCleanup: true,
    label: 'Team Member',
  },
});

Team.track = true;
Team.register();
