const keystone = require('keystone');
const Types = keystone.Field.Types;

const Movie = new keystone.List('Movie', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Movies',
  sortable: true,
});

Movie.add({
  name: { type: String, required: true, },
  name_chn: { type: String, label: 'Chinese title', }, // not a translatable field, because we need the name in English views
  director: { type: Types.Relationship, ref: 'Director', },
  year: { type: Number, },
  duration: { type: Number, label: 'duration (mins)', },
  summary: { type: Types.Markdown, },
  summary___CHN: { type: Types.Markdown, label: 'summary CHN', collapse: true, },
  themes: { type: Types.Relationship, ref: 'Theme', many: true, },
  genre: { type: Types.Relationship, ref: 'Genre', many: true, },
  context: { type: Types.Markdown, label: 'Movie context', },
  context___CHN: { type: Types.Markdown, label: 'context CHN', collapse: true, },
  image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, label: 'Main image', },
  gallery: { type: Types.CloudinaryImages, label: 'Image gallery', },
  video: { type: String, label: 'Video link', },
  videoLinks: { type: Types.Markdown, label: 'More video links', },
  videoLinks___CHN: { type: Types.Markdown, label: 'Video links CHN', collapse: true, },
  synopsis: { type: Types.Markdown, },
  synopsis___CHN: { type: Types.Markdown, label: 'synopsis CHN', collapse: true, },
  cinematography: { type: Types.Markdown, },
  cinematography___CHN: { type: Types.Markdown, label: 'cinematography CHN', collapse: true, },
  pointsForDiscussion: { type: Types.Markdown, label: 'Points for discussion', },
  pointsForDiscussion___CHN: { type: Types.Markdown, label: 'Points for discussion CHN', collapse: true, },
  externalLinks: { type: Types.Markdown, label: 'External links', },
  externalLinks___CHN: { type: Types.Markdown, label: 'External links CHN', collapse: true, },
  bibliography: { type: Types.Markdown, label: 'Teaching and Learning', },
  bibliography___CHN: { type: Types.Markdown, label: 'Teaching and learning CHN', collapse: true, },
});

Movie.track = true;
Movie.register();
