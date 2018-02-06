const keystone = require('keystone');
const Types = keystone.Field.Types;

const AboutUs = new keystone.List('About_us', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'About',
  nocreate: true,
  nodelete: true,
});

AboutUs.add({
  name: { type: String, },
  text: { type: Types.Markdown, label: 'About YiMovi text EN', },
  text___chn: { type: Types.Markdown, label: 'About YiMovi text CHN', },
});

AboutUs.track = true;
AboutUs.register();
