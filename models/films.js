const keystone = require('keystone');
const types = keystone.Field.Types;

const Film = new keystone.List('Film', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Films',
});

Film.add({
  name: { type: String, required: true, },
  director: { type: types.Relationship, ref: 'Director', },
  year: { type: Number, },
  duration: { type: Number, label: 'duration (mins)', },
  summary: { type: types.Markdown, },
  themes: { type: types.Relationship, ref: 'Theme', many: true, },
  genre: { type: types.Relationship, ref: 'Genre', many: true, },
  //image,
  synopsis: { type: types.Markdown, },
  cinematography: { type: types.Markdown, },
  pointsForDiscussion: { type: types.Markdown, label: 'Points for discussion', },
  externalLinks: { type: types.Markdown, label: 'External links', },
  furtherReading: { type: types.Markdown, label: 'Further reading', },
});

Film.track = true;
Film.register();
