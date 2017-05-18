const keystone = require('keystone');
const Types = keystone.Field.Types;

const Film = new keystone.List('Film', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Films',
});

Film.add({
  name: { type: String, required: true, },
  director: { type: Types.Relationship, ref: 'Director', },
  year: { type: Number, },
  duration: { type: Number, label: 'duration (mins)', },
  summary: { type: Types.Markdown, },
  themes: { type: Types.Relationship, ref: 'Theme', many: true, },
  genre: { type: Types.Relationship, ref: 'Genre', many: true, },
  //image,
  synopsis: { type: Types.Markdown, },
  cinematography: { type: Types.Markdown, },
  pointsForDiscussion: { type: Types.Markdown, label: 'Points for discussion', },
  externalLinks: { type: Types.Markdown, label: 'External links', },
  furtherReading: { type: Types.Markdown, label: 'Further reading', },
});

Film.track = true;
Film.register();
