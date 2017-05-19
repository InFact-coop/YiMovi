const keystone = require('keystone');
const Types = keystone.Field.Types;

const Movie = new keystone.List('Movie', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Movies',
});

Movie.add({
  name: { type: String, required: true, },
  name_chn: { type: String, label: 'Chinese title', },
  director: { type: Types.Relationship, ref: 'Director', },
  year: { type: Number, },
  duration: { type: Number, label: 'duration (mins)', },
  summary: { type: Types.Markdown, },
  themes: { type: Types.Relationship, ref: 'Theme', many: true, },
  genre: { type: Types.Relationship, ref: 'Genre', many: true, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
  synopsis: { type: Types.Markdown, },
  cinematography: { type: Types.Markdown, },
  pointsForDiscussion: { type: Types.Markdown, label: 'Points for discussion', },
  externalLinks: { type: Types.Markdown, label: 'External links', },
  furtherReading: { type: Types.Markdown, label: 'Further reading', },
});

Movie.track = true;
Movie.register();
